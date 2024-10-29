export const registerUser= (req, res, next) => {
    res.json('User registered')
}

export const logInUser= (req, res, next) => {
    res.json('User checked-in')
}

export const getProfile= (req, res, next) => {
    res.json('User checked-out')
}

export const logOutUser= (req, res, next) => {
    res.json('User checked-out')
}

export const updateProfile= (req, res, next) => {
    res.json('User profile updated')
}