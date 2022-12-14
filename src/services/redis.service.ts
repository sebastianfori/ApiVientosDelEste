import { createClient, RedisClientType } from "redis";

class RedisService {
    private static instance: RedisService;
    private client: RedisClientType | null = null;
    private get initialized(): boolean {
        return this.client !== null;
    }

    private constructor(
    ) {
        this.client = createClient();
        this.client.on("error", function (error) {
            console.error(error);
        });
    }

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    public async get(key: string) {
        if (!this.initialized)
            return null;

        await this.client!.connect();
        const value = await this.client!.get(key);
        this.client!.disconnect();
        return value;
    }

    public async set(key: string, value: string) {
        if (!this.initialized)
            return null;

        this.client!.connect();
        await this.client!.set(key, value);
        this.client!.disconnect();
    }

    public async del(key: string) {
        if (!this.initialized)
            return null;

        this.client!.connect();
        await this.client!.del(key);
        this.client!.disconnect();
    }
}

export const redisService = RedisService.getInstance();