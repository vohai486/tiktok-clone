const DEFAULT_URL_IMAGE = "https://files.fullstack.edu.vn/f8-tiktok/";
const DEFAULT_AVATAR_IMAGE =
  "https://3.bp.blogspot.com/-TJaJfNDqUrs/UfIbyXyZbSI/AAAAAAAACQI/aMFg16YN9MU/s1600/avatar-toi-yeu-viet-nam-2.jpg";
export const renderAvatarImage = (value) => {
  if (value === DEFAULT_URL_IMAGE) return DEFAULT_AVATAR_IMAGE;
  return value;
};
export const renderName = (first, last, nickname) => {
  if (first?.length === 0 && last?.length === 0) return nickname;
  return first + " " + last;
};
export const sliceString = (string, number) => {
  if (string.length > number) {
    return string.slice(0, number - 3) + "...";
  } else return string;
};
