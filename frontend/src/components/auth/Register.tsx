'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Register() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const username = formdata.get('username') as string;
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;

    console.log(username, email, password);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Register
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 pt-6">
            <Label className="flex flex-col gap-2">
              <span>
                Name
              </span>
              <Input
                id="username"
                className=""
                name="username"
              />
            </Label>
            <Label className="flex flex-col gap-2">
              <span>
                Email
              </span>
              <Input
                id="email"
                className=""
                name="email"
                type="email"
              />
            </Label>
            <Label className="flex flex-col gap-2">
              <span>
                Password
              </span>
              <Input
                id="password"
                className=""
                name="password"
                type="password"
              />
            </Label>
            <Button type="submit">
              Register
            </Button>
          </form>
        </DialogHeader>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
