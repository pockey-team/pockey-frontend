interface ShareContent {
  label: string;
  imageUrl: string;
}

export const SHARE_CONTENTS: ShareContent[] = [
  {
    label: "이미지 저장",
    imageUrl: "/share/download.svg",
  },
  {
    label: "URL 복사",
    imageUrl: "/share/copy.svg",
  },
  {
    label: "카카오톡",
    imageUrl: "/share/kakao.svg",
  },
];
