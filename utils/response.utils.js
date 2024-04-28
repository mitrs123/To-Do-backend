
export const sendRes = (res,statuscode,data) => {
    return res.status(statuscode).json(data)
}