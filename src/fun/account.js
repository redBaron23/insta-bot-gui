const axios = require("axios");
const helper = require("./helper");

const backUri = "https://b60rxefx72.execute-api.us-east-1.amazonaws.com/dev";

//Followers/Unfollowers per account
const default_quantity = 10000;

const errTime = {
  init: 1000 * 3600 * 2,
  400: 1000 * 3600 * 0.3,
  429: 1000 * 3600 * 12
};

class Account {
  constructor(userName, passWord) {
    this._userName = userName;
    this._passWord = passWord;
  }

  async countFollows(userName) {
    let following = 100,
      followers = 100;
    const URL = "https://www.instagram.com/" + userName + "/?__a=1";

    const response = await this.getData(URL);
    try {
      following = response.data.graphql.user.edge_follow.count;
      followers = response.data.graphql.user.edge_followed_by.count;
    } catch (e) {
      console.log(e);
      console.log("Setting defaults");
    } finally {
      return [followers, following];
    }
  }

  export() {
    let data = {};
    let cookies = {};
    cookies.sessionid = this.sessionid;
    cookies.csrftoken = this.csrftoken;
    cookies.shbid = this.shbid;
    data.cookies = cookies;
    data.userName = this._userName;
    data.userId = this._userId;
    return data;
  }
  import(data) {
    try {
      let cookies = data.cookies;
      this._userId = data.userId;
      this._userName = data.userName;
      this._shbid = cookies.shbid;
      this._csrftoken = cookies.csrftoken;
      this._sessionid = cookies.sessionid;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
async test() {
    try {
      let acc, json;
      acc = {
        userName: this._userName,
        password: this._passWord
      };
      json = JSON.stringify(acc);
      console.log(backUri+"/login")
      let res = await axios.post(backUri + "/login", json);
      console.log('res',res)
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
  async init() {
    try {
      let acc, json;
      acc = {
        username: this._userName,
        password: this._passWord
      };
      json = JSON.stringify(acc);
      let res = await axios.post(backUri + "/login", acc);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
  async update() {
    [this._totalFollowers, this._totalFollowing] = await this.countFollows();
  }

  get totalFollowing() {
    return this._totalFollowing;
  }

  get totalFollowers() {
    return this._totalFollowers;
  }
  get csrftoken() {
    return this._csrftoken;
  }
  get shbid() {
    return this._shbid;
  }
  get sessionid() {
    return this._sessionid;
  }
  get userName() {
    return this._userName;
  }
  get userId() {
    return this._userId;
  }
  dump() {
    console.log(this._sessionid);
    console.log(this._shbid);
    console.log(this._userName);
    console.log(this._csrftoken);
    console.log("Followers: " + this._totalFollowers);
    console.log("Following: " + this._totalFollowing);
  }

  async getGarcas(whiteList) {
    //A garca is who you follow but it didn't follow you back
    try {
      let res, data;
      let myAccount = await this.export();
      let req = {
        data: myAccount,
        whiteList: whiteList
      };
      console.log("Antes del request");
      res = await axios.post(backUri + "/garcas", req);
      data = res.data;
      return data.status === 200 ? data.garcas : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async follow(userName) {
    try {
      let myAccount = await this.export();
      let req = {
        data: myAccount,
        userName: userName
      };
      let res = await axios.post(backUri + "/follow", req);
      return res.data.status === 200;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async stopBot() {
    try {
      const userName = this.userName;
      let req = {
        userName: userName
      };
      let res = await axios.post(backUri + "/stopBot", req);
      let json = JSON.parse(res.data);
      return json;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async isRunning() {
    try {
      const userName = this.userName;
      let req = {
        userName: userName
      };
      let res = await axios.post(backUri + "/isRunning", req);
      return res.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async unfollow(userName) {
    try {
      let myAccount = await this.export();
      let req = {
        data: myAccount,
        userName: userName
      };
      let res = await axios.post(backUri + "/unfollow", req);
      return res.data.status === 200;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async unfollowUsers(users) {
    try {
      let myAccount = await this.export();
      let req = {
        account: myAccount,
        users: users
      };
      let res = await axios.post(backUri + "/unfollowUsers", req);
      return res.data.status === 200;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async unfollowDelay(userName, time) {
    try {
      await helper.sleep(time);
      console.log("Comenzando tarea");
      let myAccount = await this.export();
      let req = {
        account: myAccount
      };
      let res = await axios.post(backUri + "/unfollow", req);
      return res.data.status === 200;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getUsers(QUERY_HASH, userName, quantity) {
    let nextCursor = "";
    let historyFileName = "history";
    // localStorage.setItem('history','string-')
    // localStorage.getItem('string-')
    // const uri_history = this._uri + "/usersHistory.json";
    //Last time searched for that user
    //If we are looking for ower users, it will not save the history
    let userHistory = {};
    try {
      userHistory = localStorage.getItem(historyFileName);
      nextCursor = userHistory[userName].nextCursor;
    } catch (e) {
      localStorage.setItem(historyFileName, "");
    }
    let users = [];

    const userId = userName ? await this.getUserId(userName) : this._userId;
    let isNextPage = true;

    const isFollower =
      QUERY_HASH === "c76146de99bb02f6415203be841dd25a" ? true : false; //true = follower
    while (isNextPage && users.length <= quantity) {
      let query_variables =
        '{"id": ' +
        userId +
        ',"include_reel":true,"fetch_mutual":false,"first":50,"after":"' +
        nextCursor +
        '"}';
      let variables = encodeURIComponent(query_variables);
      let URL =
        "https://www.instagram.com/graphql/query/?query_hash=" +
        QUERY_HASH +
        "&variables=" +
        variables;
      helper.sleep(1200);
      let response = await this.parseData(URL, isFollower);

      users = [...users, ...response.users];

      nextCursor = response.nextCursor;
      isNextPage = nextCursor ? true : false;
    }
    nextCursor = nextCursor ? nextCursor : "";
    const userType = isFollower ? "followers" : "following";
    userHistory[userName] = { nextCursor: nextCursor, userType: users };
    localStorage.setItem(historyFileName, userHistory);
    return users.slice(0, quantity);
  }

  async getUserFollowing(userName, i) {
    const quantity = i ? i : default_quantity;
    const QUERY_HASH = "d04b0a864b4b54837c0d870b0e77e076"; //Following
    return await this.getUsers(QUERY_HASH, userName, quantity);
  }

  async getUserFollowers(userName, i) {
    const quantity = i ? i : default_quantity;
    const QUERY_HASH = "c76146de99bb02f6415203be841dd25a"; //Followers
    return await this.getUsers(QUERY_HASH, userName, quantity);
  }

  async getUserGarcas(userName, WHITELIST) {
    try {
      const whiteList = localStorage.getItem("whitelist");

      const followers = await this.getUserFollowers(userName);
      const following = await this.getUserFollowing(userName);
      //No include following in followers
      const users = following.filter(i => !followers.includes(i));

      const garcas = whiteList
        ? users.filter(i => !whiteList.includes(i))
        : users;
      return garcas;
    } catch (e) {
      console.log(e);
    }
  }

  async getFollowing(i) {
    const following = await this.getUserFollowing(this._userName, i);
    return following;
  }

  async getFollowers(i) {
    const followers = await this.getUserFollowers(this._userName, i);
    return followers;
  }

  async parseData(URL, isFollower) {
    let nextCursor = false;

    const response = await this.getData(URL);

    const data = isFollower
      ? response.data.data.user.edge_followed_by
      : response.data.data.user.edge_follow;
    const isNextPage = data.page_info.has_next_page;
    if (isNextPage) {
      nextCursor = data.page_info.end_cursor;
    }

    const array = data.edges;
    const users = array.map(i => i.node.username);
    return {
      users,
      nextCursor
    };
  }

  async getData(URL) {
    const HEADERS = {
      Accept: "*/*",
      Cookie:
        "sessionid=" + this._sessionid.value + "; shbid=" + this._shbid.value,
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:77.0) Gecko/20100101 Firefox/77.0",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate",
      "X-CSRFToken": this._csrftoken.value,
      "X-IG-App-ID": "936619743392459",
      "X-IG-WWW-Claim": "hmac.AR219pFWs-qIxhqhubZT5W5dTLRV0tSHDzJDtK0-cg2BwLdF",
      "X-Requested-With": "XMLHttpRequest",
      Connection: "close",
      Referer: "https://www.instagram.com/",
      Host: "www.instagram.com"
    };
    const options = {
      url: URL,
      method: "GET",
      headers: HEADERS
    };
    try {
      const response = await axios(options);
      return response;
    } catch (e) {
      if (e.response.status == 429) {
        console.log(e.response.data);
        console.log(
          (
            "Error 429, TOO MANY REQUEST, waiting " +
            errTime[429] / (3600 * 1000) +
            " hours and try it again"
          ).red
        );
        await helper.sleep(errTime[429]);
        await this.init();
        let res = await this.getData(URL);
        return res;
      } else if (e.response.status == 400) {
        console.log(e.response.data);
        console.log(
          (
            "Error 400, BAD REQUEST, waiting " +
            errTime[400] / (3600 * 1000) +
            " hours and try it again"
          ).red
        );
        await helper.sleep(errTime[400]);
        await this.init();
        let res = await this.getData(URL);
        return res;
      } else {
        throw e;
      }
    }
  }

  async getFans() {
    //A garca is who you follow but it didn't follow you back

    const { followers, following } = await this.getAccountData();

    const users = followers.filter(i => !following.includes(i));

    return users;
  }

  async getMutuals() {
    const { followers, following } = await this.getAccountData();

    const users = followers.filter(i => following.includes(i));

    return users;
  }

  async getUserId(userName) {
    if (userName) {
      const URL = "https://www.instagram.com/" + userName + "/?__a=1";
      const response = await this.getData(URL);
      return response.data.graphql.user.id;
    } else {
      console.log("No username detected");
    }
  }

  async getAccountData() {
    const followers = await this.getFollowers();
    const following = await this.getFollowing();

    return {
      followers,
      following
    };
  }
}

exports.Account = Account;
