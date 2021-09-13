import { defineRule } from "vee-validate";

defineRule("required", (value: string) => {
  if (!value || !value.length) {
    return "入力は必須です";
  }

  return true;
});

defineRule("email", (value: string) => {
  if (!value || !value.length) {
    return true;
  }
  if (
    !/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/.test(
      value
    )
  ) {
    return "利用可能なメールアドレスを入力してください";
  }

  return true;
});

defineRule("min", (value: string, [limit]: any) => {
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return `${limit}字以上入力してください`;
  }

  return true;
});

defineRule("max", (value: string, [limit]: any) => {
  if (!value || !value.length) {
    return true;
  }
  if (value.length > limit) {
    return `入力できる文字数は${limit}字以内です`;
  }

  return true;
});

defineRule("alpha_num", (value: string) => {
  if (!value || !value.length) {
    return true;
  }
  if (!/^[A-Za-z0-9]+$/.test(value)) {
    return "半角英数字のみ入力可能です";
  }

  return true;
});
