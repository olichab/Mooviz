/** Import modules */
declare const jwt: any;
/** Environment variables */
declare const jwtSecret: string | undefined;
/** Interfaces */
interface IUserInfos {
    id: number | null;
    email: string;
    pseudo: string;
}
/**
 * Decode id userfrom token
 * @param {Request} req
 * @returns {Object} user infos : id, email, pseudo
 */
declare const decodeUserInfosFromToken: (req: any) => IUserInfos;
