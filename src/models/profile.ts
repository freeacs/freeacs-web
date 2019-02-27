import * as t from "io-ts";

export const Profile = t.interface({
    id: t.number,
    name: t.string
});

export const ProfileArray = t.array(Profile);

export type Profile = t.TypeOf<typeof Profile>