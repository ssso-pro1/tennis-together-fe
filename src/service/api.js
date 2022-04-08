import baseApi from 'service/baseApi'

export async function getGame(gameNo) {
  try {
    const result = await baseApi(`/games/${gameNo}`)
    return result
  } catch (error) {
    console.log(error)
  }
}
export async function myGameApplyUser(gameNo) {
  try {
    const result = await baseApi(`/games/${gameNo}/users`)
    return result
  } catch (error) {
    console.log(error)
  }
}
export async function approveGame(gameNo, userUid) {
  try {
    const result = await baseApi.post(`/games/${gameNo}/approve/${userUid}`)
    return result
  } catch (error) {
    console.log(error)
  }
}
export async function refuseGame(gameNo, userUid) {
  try {
    const result = await baseApi.post(`/games/${gameNo}/refuse/${userUid}`)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function applyHistory(gameNo) {
  try {
    const result = await baseApi.post(`/games/${gameNo}/apply`)
    return result
  } catch (error) {
    console.log(error)
  }
}
export async function applyGame() {
  try {
    const result = await baseApi(`games/histories/applygames`)
    return result
  } catch (error) {
    console.log(error)
  }
}
export async function getComment(gameNo) {
  try {
    const result = await baseApi(`/games/${gameNo}/comments`)

    return result
  } catch (error) {
    console.log(error)
  }
}
export async function createComment(values, gameNo) {
  try {
    await baseApi.post(`/games/${gameNo}/comments`, {
      reviewContents: values.comments,
    })
  } catch (error) {
    console.log(error)
    alert('로그인 후 이용가능합니다.')
  }
}

export async function editComment(values, gameNo, commentNo) {
  try {
    await baseApi.patch(`/games/${gameNo}/comments/${commentNo}`, {
      reviewContents: values.reviewContent,
    })
  } catch (error) {
    console.log(error)
  }
}
export async function deleteComment(gameNo, commentNo) {
  try {
    const result = await baseApi.delete(
      `/games/${gameNo}/comments/${commentNo}`
    )
    if (result) {
      alert('삭제되었습니다')
    }
  } catch (error) {
    console.log(error)
  }
}

export async function createList(formData) {
  const {
    title,
    genderType,
    historyType,
    ageType,
    strDt,
    endDt,
    content,
    courtNo,
  } = formData

  try {
    await baseApi.post('/games', {
      title: title,
      genderType: genderType,
      historyType: Number(historyType),
      ageType: Number(ageType),
      strDt: strDt,
      endDt: endDt,
      content: content,
      courtNo: courtNo,
    })
  } catch (error) {
    console.log(error)
  }
}
export async function updateList(gameNo, formData) {
  const {
    title,
    genderType,
    historyType,
    ageType,
    strDt,
    endDt,
    content,
    courtNo,
  } = formData
  try {
    await baseApi.patch(`/games/${gameNo}`, {
      title: title,
      genderType: genderType,
      historyType: Number(historyType),
      ageType: Number(ageType),
      strDt: strDt,
      endDt: endDt,
      content: content,
      courtNo: courtNo,
    })
  } catch (error) {
    console.log(error)
  }
}

export async function deleteList(gameNo) {
  try {
    await baseApi.delete(`/games/${gameNo}`)
  } catch (error) {
    console.log(error)
  }
}

export async function getReview(reviewNo) {
  try {
    const result = await baseApi(`/reviews/${reviewNo}`)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function deleteReview(reviewNo) {
  try {
    const result = await baseApi.delete(`/reviews/${reviewNo}`)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function createReview(values) {
  try {
    const res = await baseApi.post('/reviews', {
      reviewContent: values.reviewContent,
      score: values.score,
      gameNo: values.gameNo,
    })
    if (res.data) {
      console.log(res.data)
      alert('리뷰가 등록되었습니다')
    }
  } catch (error) {
    console.log(error)
  }
}
export async function updateReview(values) {
  try {
    const res = await baseApi.patch(`/reviews/${values.reviewNo}`, {
      reviewContent: values.reviewContent,
      score: values.score,
      reviewNo: values.reviewNo,
    })
    if (res.data) {
      console.log(res.data)
      alert('리뷰가 등록되었습니다')
    }
  } catch (error) {
    console.log(error)
  }
}
