import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import DesignSystemText from "./DesignSystem/DesignSystemText";

function getFilename(path: string) {
  return path.split("/").pop() || "";
}

const TitleBar = styled("header")`
  ${DesignSystemText.Caption1.__emotion_styles};
  -webkit-app-region: drag;
  text-align: center;
`;

const Panel = styled.div`
  ${DesignSystemText.Title1.__emotion_styles};
  flex-grow: 1;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;

  border-radius: 10px;
  margin: 1px;
  padding: 0.3em;
  text-align: center;
  word-break: break-word;

  &[data-result=""] {
    color: gray;
  }
`;

function debounceTrailingEdge<T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: T) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(context, args), delay);
  };
}

const debouncedSearch = debounceTrailingEdge(
  async (query: string, callback: (result: bridge.SearchResult) => void) => {
    callback(await bridge.search(query));
  },
  500,
);

const App = () => {
  const [query, setQuery] = useState<string>(undefined);
  const [result, setResult] = useState<bridge.SearchResult>(undefined);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function effect() {
      if (query == null) {
        return;
      } else if (query.length === 0) {
        setResult(undefined);
      } else {
        setResult(undefined);
        debouncedSearch(query, (result) => {
          let queryIsSame;
          setQuery((newQuery) => {
            queryIsSame = newQuery === query;
            return newQuery;
          });
          if (queryIsSame) {
            setResult(result);
          }
        });
      }
    }
    effect();
  }, [query]);

  return (
    <>
      <TitleBar>Fake Quicksilver</TitleBar>
      <Panel
        ref={(el) => {
          panelRef.current = el;
          el?.focus();
        }}
        onBlur={(event) => {
          event.preventDefault();
          let el = event.currentTarget;
          el.setAttribute("contentEditable", "");
          el.focus();
          el.removeAttribute("contentEditable");
        }}
        onKeyDown={(event) => {
          if (
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey
          ) {
            return;
          }

          if (event.key.length === 1) {
            setQuery((query ?? "") + event.key);
          } else if (event.key === "Backspace") {
            setQuery("");
            setResult(undefined);
          } else if (event.key === "Enter") {
            if (result) {
              bridge.open(result.path);
            }
          }
        }}
        tabIndex={0}
        data-query={query ? "true" : ""}
        data-result={result ? "true" : ""}
      >
        {result && (
          <img
            draggable={false}
            src={result.iconUrl}
            className={css`
              width: 64px;
              height: 64px;
              object-fit: contain;
            `}
          />
        )}
        <div
          className={css`
            flex-shrink: 1;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
          `}
        >
          {(result && getFilename(result.path)) || query}
        </div>
      </Panel>
      {/* <Panel tabIndex={1}>Action</Panel> */}
    </>
  );
};

export default App;
