import baseApi from 'service/baseApi'

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

    alert('발행이 완료되었습니다')
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

    alert('수정이 완료되었습니다')
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
