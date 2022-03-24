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
