import { HelmetOptions } from "helmet";

export const getHelmetConfig: () => HelmetOptions = (): HelmetOptions => {
    const isDevelopment: boolean = process.env.NODE_ENV === "development";

    // Base configuration for APIs
    const baseConfig: HelmetOptions = {
        // Disable for JSON APIs
        contentSecurityPolicy: false,
        // Always hide server info
        hidePoweredBy: true,
        // Always prevent MIME sniffing
        noSniff: true,
    };

    if (isDevelopment) {
        return {
            ...baseConfig,
            // No HTTPS enforcement in development
            hsts: false,
        } as HelmetOptions;
    }

    // Production
    return {
        ...baseConfig,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        frameguard: { action: "deny" },
    } as HelmetOptions;
};