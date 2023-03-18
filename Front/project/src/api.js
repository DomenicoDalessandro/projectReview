export const getAllGames = async () => {
  try {
    const response = await fetch("http://localhost:8080/game");
    if (response.ok) {
      const data = await response.json();
      return { ok: true, data: data };
    } else {
      return { ok: false, data: "error" };
    }
  } catch (error) {
    console.log("error");
  }
};

export const getAllUser = async () => {
  try {
    const response = await fetch("http://localhost:8080/user");
    if (response.ok) {
      const data = await response.json();
      return { ok: true, data: data };
    } else {
      return { ok: false, data: "error" };
    }
  } catch (error) {
    console.log("error");
  }
};
export const getUserById = async (id) => {
  try {
    const response = await fetch("http://localhost:8080/user/" + id);
    if (response.ok) {
      const data = await response.json();
      return { ok: true, data: data };
    } else {
      return { ok: false, data: "error" };
    }
  } catch (error) {
    console.log("error");
  }
};
export const insertUser = async (user) => {
  try {
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const putUser = async (user, id) => {
  try {
    const response = await fetch("http://localhost:8080/user/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const getRieview = async () => {
  try {
    const response = await fetch("http://localhost:8080/review");
    if (response.ok) {
      const data = await response.json();
      return { ok: true, data: data };
    } else {
      return { ok: false, data: "error" };
    }
  } catch (error) {
    console.log("error");
  }
};
export const insertReview = async (userid, gameid, review) => {
  try {
    const response = await fetch(
      "http://localhost:8080/review/" + userid + "/review/" + gameid,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};

export const deleteGame = async (id) => {
  try {
    const result = await fetch("http://localhost:8080/game/" + id, {
      method: "DELETE",
    });
    if (result.ok) {
      return { ok: true, data: "Success" };
    } else {
      return { ok: false, data: await result.json() };
    }
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const insertGame = async (game) => {
  try {
    const response = await fetch("http://localhost:8080/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const putGame = async (game, id) => {
  try {
    const response = await fetch("http://localhost:8080/game/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const insertBanner = async (banner) => {
  try {
    const response = await fetch("http://localhost:8080/banner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(banner),
    });
    const data = await response.json();
    return { ok: true, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const getBanner = async () => {
  try {
    const response = await fetch("http://localhost:8080/banner");
    if (response.ok) {
      const data = await response.json();
      return { ok: true, data: data };
    } else {
      return { ok: false, data: "error" };
    }
  } catch (error) {
    console.log("error");
  }
};
export const assignBanner = async (gamesid, banid) => {
  try {
    const response = await fetch(
      "http://localhost:8080/game/" + gamesid + "/genere/" + banid,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const deleteBanner = async (id) => {
  try {
    const result = await fetch("http://localhost:8080/banner/" + id, {
      method: "DELETE",
    });
    if (result.ok) {
      return { ok: true, data: "Success" };
    } else {
      return { ok: false, data: await result.json() };
    }
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const putBanner = async (bann, id) => {
  try {
    const response = await fetch("http://localhost:8080/banner/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bann),
    });
    const data = await response.json();
    return { ok: true, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const deleteReview = async (id) => {
  try {
    const result = await fetch("http://localhost:8080/review/" + id, {
      method: "DELETE",
    });
    if (result.ok) {
      return { ok: true, data: "Success" };
    } else {
      return { ok: false, data: await result.json() };
    }
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const putReview = async (rev) => {
  try {
    const response = await fetch("http://localhost:8080/review/" + rev.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rev),
    });
    const data = await response.json();
    return { ok: true, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const deleteUser = async (id) => {
  try {
    const result = await fetch("http://localhost:8080/user/" + id, {
      method: "DELETE",
    });
    if (result.ok) {
      return { ok: true, data: "Success" };
    } else {
      return { ok: false, data: await result.json() };
    }
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const getReviewByUAndG = async (userid, gameid) => {
  try {
    const response = await fetch(
      "http://localhost:8080/review/" + userid + "/rev/" + gameid
    );
    if (response.ok) {
      const data = await response.json();
      return { ok: true, data: data };
    } else {
      return { ok: false, data: "error" };
    }
  } catch (error) {
    console.log("error");
  }
};
export const postAddon = async (id, addon) => {
  try {
    const response = await fetch("http://localhost:8080/game/addon/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addon),
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const getAddonByGameId = async (id) => {
  try {
    const response = await fetch("http://localhost:8080/game/" + id + "/addon");
    const data = await response.json();
    return { ok: response.ok, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const deleteAddon = async (id) => {
  try {
    const result = await fetch("http://localhost:8080/game/addon/" + id, {
      method: "DELETE",
    });
    if (result.ok) {
      return { ok: true, data: "Success" };
    } else {
      return { ok: false, data: await result.json() };
    }
  } catch (error) {
    return { ok: false, data: error };
  }
};
export const adminPass = async () => {
  try {
    const response = await fetch("http://localhost:8080/admin");
    if (response.ok) {
      const data = await response.json();
      return { ok: true, data: data };
    } else {
      return { ok: false, data: "error" };
    }
  } catch (error) {
    console.log("error");
  }
};
export const putAdminPass = async (pass) => {
  try {
    const response = await fetch("http://localhost:8080/admin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pass),
    });
    const data = await response.json();
    return { ok: true, data: data };
  } catch (error) {
    return { ok: false, data: error };
  }
};
