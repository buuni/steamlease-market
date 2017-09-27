
export class User {
    public id: number;
    public steamId: number;
    public username: string;
    public avatar: string;

    static fromJson(data: any) {
        const user: User = new User();
        data = typeof data !== "object" ? JSON.parse(data) : data;

        user.id = data.id;
        user.steamId = data.steamId;
        user.username = data.name;
        user.avatar = data.avatar;

        return user;
    }
}