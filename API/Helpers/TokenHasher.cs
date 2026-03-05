using System.Security.Cryptography;
using System.Text;

namespace API.Helpers;

public static class TokenHasher
{
    public static string HashToken(string token)
    {
        if (string.IsNullOrWhiteSpace(token))
            throw new ArgumentException("Token cannot be null or empty", nameof(token));

        using var sha256 = SHA256.Create();
        var tokenBytes = Encoding.UTF8.GetBytes(token);
        var hashBytes = sha256.ComputeHash(tokenBytes);
        return Convert.ToBase64String(hashBytes);
    }

    public static bool VerifyToken(string token, string hashedToken)
    {
        if (string.IsNullOrWhiteSpace(token) || string.IsNullOrWhiteSpace(hashedToken))
            return false;

        var tokenHash = HashToken(token);

        // Use constant-time comparison to prevent timing attacks
        return CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(tokenHash),
            Encoding.UTF8.GetBytes(hashedToken)
        );
    }
}
