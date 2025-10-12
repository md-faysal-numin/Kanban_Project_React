import type { ChangeEvent } from "react";

type Email = {
  [key: string]: string;
};

type User = {
  [key: string]: UserInfo;
};
type UserInfo = {
  email: string;
  password: string;
  task: string[];
};

type TaskInfo = {
  title: string;
  description: string;
  assigned: string;
  section: string;
  creator: string;
};

type Task = {
  [key: string]: TaskInfo;
};

type Input = {
  type: string;
  title: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type SpanRefType = React.RefObject<HTMLSpanElement>;
type InputRefType = React.RefObject<HTMLInputElement>;
export type { Email, User, Task, Input, SpanRefType, TaskInfo, InputRefType };
