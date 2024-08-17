"use client";
function Button({ name, task }: { name: string; task: () => void }) {
  return <button onClick={task}>{name}</button>;
}
export default Button;
