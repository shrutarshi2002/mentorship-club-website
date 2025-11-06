import jwt from "jsonwebtoken";

// Helper function to verify JWT token
export function verifyToken(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
  } catch (error) {
    return null;
  }
}

// Middleware to check if user is authenticated
export function requireAuth(handler) {
  return async function (request, ...args) {
    const decoded = verifyToken(request);

    if (!decoded) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized. Please provide a valid token.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Add user info to request
    request.user = decoded;
    return handler(request, ...args);
  };
}

// Middleware to check if user has admin role
export function requireAdmin(handler) {
  return async function (request, ...args) {
    const decoded = verifyToken(request);

    if (!decoded) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized. Please provide a valid token.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (decoded.role !== "admin") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Forbidden. Admin access required.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Add user info to request
    request.user = decoded;
    return handler(request, ...args);
  };
}

// Middleware to check if user has specific role
export function requireRole(role) {
  return function (handler) {
    return async function (request, ...args) {
      const decoded = verifyToken(request);

      if (!decoded) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Unauthorized. Please provide a valid token.",
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (decoded.role !== role) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `Forbidden. ${role} access required.`,
          }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Add user info to request
      request.user = decoded;
      return handler(request, ...args);
    };
  };
}





