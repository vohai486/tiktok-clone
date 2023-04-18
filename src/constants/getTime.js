export function timeSince(date) {
  if (!date) return {};
  // current Time - date
  const now = new Date();
  const yourDate = new Date(date);
  const seconds = Math.floor((now.getTime() - yourDate.getTime()) / 1000); // in ra số giây

  let timer = seconds / 31536000; // 0.00002342
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: "năm",
    };
  }
  timer = seconds / 2678400; // 0.0023424
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: "tháng",
    };
  }
  timer = seconds / 604800; // 0.023423
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: "tuần",
    };
  }
  timer = seconds / 86400; // 0.9
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: "ngày",
    };
  }
  timer = seconds / 3600; // 1.333
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: "giờ",
    };
  }
  timer = seconds / 60;
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: "phút",
    };
  }
  timer = seconds;
  if (timer > 1) {
    return {
      value: "vừa xong",
      unit: "",
    };
  }
  return {
    value: "Vừa xong",
    unit: "",
  };
}
