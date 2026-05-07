import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { CommentModal } from "./CommentModal.jsx";
import "./CommentButton.css";

/**
 * Listens for a single document click while `active`, records coordinates, then exits comment mode and opens the modal.
 */
function ClickListener({ active, onStop }) {
  const [modal, setModal] = useState(null);
  const timeoutRef = useRef(null);
  const handlerRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    setModal(null);

    const handler = (e) => {
      const t = e.target;
      if (t instanceof Element && t.closest("[data-comment-button]")) return;

      setModal({
        x: e.clientX,
        y: e.clientY,
      });
      onStop();
    };
    handlerRef.current = handler;

    /* Defer so the click that enabled comment mode cannot fire this listener */
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      document.addEventListener("click", handler, { once: true, capture: true });
    }, 0);

    return () => {
      if (timeoutRef.current != null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      const h = handlerRef.current;
      if (h) {
        document.removeEventListener("click", h, { capture: true });
        handlerRef.current = null;
      }
    };
  }, [active, onStop]);

  if (!modal) return null;
  return createPortal(
    <CommentModal position={{ x: modal.x, y: modal.y }} onClose={() => setModal(null)} />,
    document.body
  );
}

export function CommentButton() {
  const [active, setActive] = useState(false);

  const stopCommentMode = useCallback(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const prev = document.body.style.cursor;
    document.body.style.cursor = "crosshair";
    return () => {
      document.body.style.cursor = prev;
    };
  }, [active]);

  return createPortal(
    <>
      <button
        type="button"
        data-comment-button
        className="susi-btn susi-comment-fab"
        aria-expanded={active}
        aria-pressed={active}
        aria-label={
          active
            ? "Comment mode on — click anywhere on the page to place your comment"
            : "Comment"
        }
        onClick={(e) => {
          e.stopPropagation();
          setActive(true);
        }}
      >
        <span className="susi-comment-fab__emoji" aria-hidden="true">
          💬
        </span>
        Comment
      </button>

      <ClickListener active={active} onStop={stopCommentMode} />
    </>,
    document.body
  );
}
