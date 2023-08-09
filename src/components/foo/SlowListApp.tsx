import { FC, memo, useDeferredValue, useState, Suspense } from "react";

export default function SlowListApp() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);
  const [garbage] = useState("garbage!");
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={deferredText} prep={garbage} />
    </>
  );
}

interface SLProp {
  text: string;
  prep: string;
}

const SlowList: FC<SLProp> = memo(function SlowList({ text, prep }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log("[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />");

  return (
    // <Suspense fallback={<p>Loading...</p>}>
    <SlowWrapper text={text} prep={prep} />
    // </Suspense>
  );
});

function SlowWrapper({ text, prep }) {
  let items = [];
  for (let i = 0; i < text.length; i++) {
    // let startTime = performance.now();
    // while (performance.now() - startTime < 1) {
    //   // Do nothing for 1 ms per item to emulate extremely slow code
    // }
    items.push(<SlowItem key={i} text={text} prep={prep} />);
  }
  return <ul className="items">{items}</ul>;
}

function SlowItem({ text, prep }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Text: {prep} {text}
    </li>
  );
}
