'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.password.value;
    console.log(username, password);
  };

  return (
    <Dialog>
      <DialogTrigger>
        Login
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <Label className="flex flex-col">
                <span>
                  Name
                </span>
                <Input
                  id="username"
                  className=""
                  name="username"
                />
              </Label>
              <Label className="flex flex-col">
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
                Login
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
