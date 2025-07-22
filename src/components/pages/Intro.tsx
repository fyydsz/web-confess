import {
  Card,
  // CardAction tidak diekspor oleh shadcn/ui, bisa dihapus
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

function Intro({ onComplete }: { onComplete: () => void }) {
  const [secretCode, setSecretCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.spacewalk.my.id/confess/data?confessId=${secretCode}`);
      if (response.status !== 200) {
        throw new Error("Secret code is incorrect or not found.");
      }
      onComplete();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Hello there!</CardTitle>
        <CardDescription>
          This is my confession project, where I want to share my feelings, but before that, you need to enter the code to access it.
        </CardDescription>
      </CardHeader>

      {/* Pindahkan semua yang berhubungan dengan form ke dalam satu tag <form> */}
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="secret-code">Secret Code</Label>
              <Input
                id="secret-code"
                type="password" // Sebaiknya gunakan type="password" untuk kode rahasia
                placeholder="Enter your secret code here"
                required
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value.toUpperCase())} // Opsional: Ubah ke huruf besar
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        </CardContent>

        {/* PINDAHKAN CardFooter KE DALAM SINI */}
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Enter'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Intro;