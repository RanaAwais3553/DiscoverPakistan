export const ERROR_CONSTANTS = {
  ERROR_CODE_500_MSG: "Server not responding, please try later!",
  LOCATION_PERMISSION_ERROR: "Location Permission Required!",
};

export const isLogin = (props, callback) => {
  let { userData, isLoggedIn } = props;
  if (!isObjEmpty(userData) && isLoggedIn) {
    if (callback) {
      callback(true);
    }
  } else {
    props.navigation.navigate("Signin");
    callback(false);
  }
};

export function displayMessage(res) {
  if (res.data.response) {
    alert(res.data.response);
  }
  if (res.data.status === "error") {
    if (res.data.data) {
      alert(res.data.data);
    }
    if (res.data.message) {
      alert(res.data.message);
    }
  }
  if (res.data.status === "success") {
    if (res.data.message) {
      alert(res.data.message);
    }
    // alert(res.data.data)
  }
}

export function isObjUndefined(obj) {
  return obj !== undefined && Object.keys(obj).length !== 0;
}

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function isEmpty(msg) {
  return msg !== null && msg !== undefined && msg !== null ? false : true;
}

export function simplify(string) {
  if (string !== "" && string !== null && string !== undefined) {
    return string.replace(/\s/g, "").toLowerCase();
  } else {
    return string;
  }
}

export function isNullRetNull(string, retVal = "") {
  return string !== undefined && string !== null && string !== ""
    ? string
    : retVal;
}

export function getDataFromArrayById(id, services = []) {
  let service = {};
  if (services.length > 0) {
    services.map((item, i) => {
      if (item.id) {
        if (parseInt(item.id) === parseInt(id)) {
          service = item;
        }
      } else {
        if (parseInt(item.service_id) === parseInt(id)) {
          service = item;
        }
      }
    });
  }
  return service;
}

export function splitArrayIntoChunks(array, lenght) {
  var chunks = [],
    i = 0,
    n = array.length;
  while (i < n) {
    chunks.push(array.slice(i, (i += lenght)));
  }
  return chunks;
}

export function padNumber(number, p = "000") {
  let str = "" + number;
  let pad = p;
  return pad.substring(0, pad.length - str.length) + str;
}

export function getUrl(url, slug = false) {
  if (url) {
    if (url.includes("http")) {
      if (url.includes("watch?v=")) {
        return {
          html: `<iframe src="${url.replace("watch?v=", "embed/")}"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="1" 
                    />`,
        };
      } else if (url.includes("youtu.be")) {
        return {
          html: `<iframe src="${url.replace("youtu.be", "youtube.com/embed/")}"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="1" 
                    />`,
        };
      } else {
        return { uri: url };
      }
    } else {
      if (slug) {
        return {
          html: `<iframe src="https://www.youtube.com/embed/${url}"
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="1" 
                />`,
        };
      }

      return {
        html: `<iframe src="https://www.youtube.com/embed/${url}"
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="1" 
                />`,
      };
    }
  } else {
    return {
      html: `<iframe src="https://www.youtube.com/embed/zer2lMc5J5k"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="1" 
        />`,
    };
  }
}

export const sortCommunityComments = (arr) => {
  var temp = [...arr];
  arr = arr.sort((a, b) => b.parent - a.parent);
  arr.forEach((o, index) => {
    if (temp[0].parent_comment_id === 0 || temp[0].parent_comment_id === "0")
      return;
    var parentIndex = temp.findIndex(
      (o) => o.comment_id === temp[0].parent_comment_id,
    );
    if (parentIndex > -1) {
      temp[parentIndex].replies
        ? temp[parentIndex].replies.push(temp[0])
        : (temp[parentIndex].replies = [temp[0]]);
    }
    temp.shift();
  });
  return temp;
};

export const sortComments = (arr) => {
  var temp = [...arr];
  arr = arr.sort((a, b) => b.parent - a.parent);
  arr.forEach((o, index) => {
    if (temp[0].parent_comment_id === 0 || temp[0].parent_comment_id === "0")
      return;
    var parentIndex = temp.findIndex(
      (o) => o.vcomment_id === temp[0].parent_comment_id,
    );
    if (parentIndex > -1) {
      temp[parentIndex].replies
        ? temp[parentIndex].replies.push(temp[0])
        : (temp[parentIndex].replies = [temp[0]]);
    }
    temp.shift();
  });
  return temp;
};

export function getDiffInDates(from, to) {
  if (from) {
    var fromDate = new Date(from);
    var toDate = to ? new Date(to) : new Date();
    var difference_In_Time = toDate.getTime() - fromDate.getTime();
    var difference_In_Days = parseInt(difference_In_Time / (1000 * 3600 * 24));
    if (difference_In_Days > 365) {
      return `${parseInt(difference_In_Days / 365)} years`;
    }
    if (difference_In_Days > 365) {
      return `${parseInt(difference_In_Days / 30)} months`;
    }
    if (difference_In_Days > 6) {
      return `${parseInt(difference_In_Days / 7)} weeks`;
    }
    return `${parseInt(difference_In_Days)} days`;
  }
}
