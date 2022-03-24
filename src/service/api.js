import baseApi from 'service/baseApi'

export async function createList(formData) {
  try {
    await baseApi.post('/games', {
      title: formData.title,
      genderType: formData.genderType,
      historyType: Number(formData.historyType),
      ageType: Number(formData.ageType),
      strDt: formData.strDt,
      endDt: formData.endDt,
      content: formData.content,
      courtNo: formData.courtNo,
    })

    alert('발행이 완료되었습니다')
  } catch (error) {
    console.log(error)
  }
}
export async function updateList(gameNo, formData) {
  try {
    await baseApi.patch(`/games/${gameNo}`, {
      title: formData.title,
      genderType: formData.genderType,
      historyType: Number(formData.historyType),
      ageType: Number(formData.ageType),
      strDt: formData.strDt,
      endDt: formData.endDt,
      content: formData.content,
      courtNo: formData.courtNo,
    })

    alert('수정이 완료되었습니다')
  } catch (error) {
    console.log(error)
  }
}
