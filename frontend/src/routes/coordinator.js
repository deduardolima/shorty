
export const goToHome = (navigate) => {
    navigate("/")
}
export const goToCounter = (navigate) => {
    navigate("/counter")
}
export const goToShorty = (navigate) => {
    navigate(`/shorty`)
}
export const goToShortyId = (navigate, id) => {
    navigate(`/shorty/${id}`)
}
export const goBack = (navigate) => {
    navigate(-1)
}
export const goToCreate = (navigate) => {
    navigate(`/shorty/create`)
}
export const goToUpdate = (navigate, id) => {
    navigate(`/shorty/update/${id}`)
}
export const goToShortyCreated = (navigate) => {
    navigate(`/shorty/created`)
}
export const goToCreateUpload = (navigate) => {
    navigate(`/shorty/create/upload`)
}
export const goToQuery = (navigate) => {
    navigate(`/shorty/query`)
}
export const goToCounterID = (navigate, id) => {
    navigate(`/counter/${id}`)
}