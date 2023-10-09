export const getAlbumButtons = (loginStatus: boolean) => {
  if (loginStatus) {
    return [
      { name: "add", src: "/src/resources/add.png" },
      { name: "delete", src: "/src/resources/delete.png" },
      { name: "filter", src: "/src/resources/filter.png" },
    ];
  } else {
    return [
      { name: "add", src: "/src/resources/add_forbid.png" },
      { name: "delete", src: "/src/resources/delete_forbid.png" },
      { name: "filter", src: "/src/resources/filter.png" },
    ];
  }
};
export const getPhotoButtons = (loginStatus: boolean) => {
  if (loginStatus) {
    return [
      { name: "upload", src: "/src/resources/upload.png" },
      { name: "delete", src: "/src/resources/delete.png" },
      { name: "filter", src: "/src/resources/filter.png" },
      { name: "setting", src: "/src/resources/setting.png" },
    ];
  } else {
    return [
      { name: "upload", src: "/src/resources/upload_forbid.png" },
      { name: "delete", src: "/src/resources/delete_forbid.png" },
      { name: "filter", src: "/src/resources/filter.png" },
      { name: "setting", src: "/src/resources/setting_forbid.png" },
    ];
  }
};
export const getPictureButtons = (loginStatus: boolean) => {
  if (loginStatus) {
    return [
      { name: "download", src: "/src/resources/download.png" },
      { name: "delete", src: "/src/resources/delete.png" },
      { name: "close", src: "/src/resources/close_circle.png" },
    ];
  } else {
    return [
      { name: "download", src: "/src/resources/download.png" },
      { name: "delete", src: "/src/resources/delete_forbid.png" },
      { name: "close", src: "/src/resources/close_circle.png" },
    ];
  }
};
export const getAnniversaryButtons = (loginStatus: boolean) => {
  if (loginStatus) {
    return [
      { name: "add", src: "/src/resources/add.png" },
      { name: "delete", src: "/src/resources/delete.png" },
    ];
  } else {
    return [
      { name: "add", src: "/src/resources/add_forbid.png" },
      { name: "delete", src: "/src/resources/delete_forbid.png" },
    ];
  }
};
export const getTodoButtons = (loginStatus: boolean) => {
  if (loginStatus) {
    return [
      { name: "add", src: "/src/resources/add.png" },
      { name: "filter", src: "/src/resources/filter.png" },
      { name: "lottery", src: "/src/resources/lottery.png" },
    ];
  } else {
    return [
      { name: "add", src: "/src/resources/add_forbid.png" },
      { name: "filter", src: "/src/resources/filter.png" },
      { name: "lottery", src: "/src/resources/lottery.png" },
    ];
  }
};
