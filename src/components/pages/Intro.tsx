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
      await axios.get(`https://api.spacewalk.my.id/confess/data?confessId=${secretCode}`);
      // Delay simulasi
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (err: any) {
      console.error("Error fetching data:", err);

      await new Promise(resolve => setTimeout(resolve, 2000));

      if (err.response?.status === 404) {
        setError("Oops, incorrect code.");
      } else if (err.response?.status === 403) {
        setError("Sorry, this code has been used, thank you for reading my confession.");
      }else {
        setError(err.message || "An unexpected error occurred.");
      }
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
                type="text"
                placeholder="Enter your secret code here"
                required
                maxLength={8}
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        </CardContent>

        {/* PINDAHKAN CardFooter KE DALAM SINI */}
        <CardFooter className="pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Enter'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Intro;