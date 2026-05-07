import { supabase } from "../lib/supabase";
import { captureScreenshot } from "../lib/captureScreenshot";
import { useEffect, useState } from "react";
import "./CommentModal.css";

export function CommentModal({ position, onClose }) {
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !saving) onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, saving]);

  if (!position) return null;

  async function saveComment() {
    setSaving(true);
    setError(null);
    try {
      let publicUrl = null;

      try {
        const screenshot = await captureScreenshot();
        const blob = await fetch(screenshot).then((r) => r.blob());
        const filename = `comment-${Date.now()}.png`;

        const { error: uploadError } = await supabase.storage
          .from("comment-screenshots")
          .upload(filename, blob, { contentType: "image/png", upsert: false });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from("comment-screenshots").getPublicUrl(filename);
        publicUrl = urlData.publicUrl;
      } catch (captureOrUploadErr) {
        console.warn("[comments] Screenshot or upload failed:", captureOrUploadErr);
        /* Continue — save comment text + coordinates if DB allows null screenshot_url */
      }

      const { error: insertError } = await supabase.from("comments").insert({
        comment: text,
        page_url: window.location.href,
        x: Number(position.x),
        y: Number(position.y),
        screenshot_url: publicUrl,
      });

      if (insertError) throw insertError;

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSaving(false);
    }
  }

  return (
    <div
      className="susi-comment-modal-backdrop susi-comment-modal-backdrop--centered"
      role="presentation"
      onClick={saving ? undefined : onClose}
    >
      <div
        className="susi-comment-modal susi-comment-modal--centered"
        role="dialog"
        aria-modal="true"
        aria-labelledby="susi-comment-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="susi-comment-modal-title" className="susi-comment-modal__title">
          Add comment
        </h2>

        <div className="susi-comment-modal__form">
          <textarea
            className="susi-comment-modal__textarea"
            placeholder="Leave a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={saving}
            rows={4}
            autoFocus
          />

          {error ? (
            <p className="susi-comment-modal__error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="susi-comment-modal__actions">
            <button type="button" className="susi-btn" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="button" className="susi-btn" onClick={saveComment} disabled={saving}>
              {saving ? "Saving…" : "Save comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
