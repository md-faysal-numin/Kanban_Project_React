import type { User, Email, Task } from "../types";

type ValueType = User | Email | Task;
const localStorageUtil = {
  set: (key: string, value: ValueType) => {
    try {
      const val = JSON.stringify(value);
      localStorage.setItem(key, val);
    } catch (error) {
      console.log("Error Saving to localstorage", error);
    }
  },
  get: (key: string) => {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch (error) {
      console.log("Error loading from localstorage", error);
      return null;
    }
  },
};

export default localStorageUtil;
