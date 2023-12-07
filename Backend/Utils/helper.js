import bcrypt from 'bcrypt';

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function comparePassword(raw, hash) {
    return bcrypt.compareSync(raw, hash);
}

export { hashPassword, comparePassword };