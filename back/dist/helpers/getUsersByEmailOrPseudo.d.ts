/** Imports modules */
declare const knex: any;
/** Interfaces */
interface IUser {
    idUser: number;
    pseudo: string;
    email: string;
}
/**
 * Checks if email or pseudo exists.
 * @param {String} email
 * @param {String} pseudo
 * @returns {Array} users found in db.
 */
declare const getUsersByEmailOrPseudo: (email: string, pseudo: string) => Promise<IUser[]>;
