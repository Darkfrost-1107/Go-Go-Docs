'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { User } from '@/types/user';
import { ChevronDown, LogOut, SunMoon } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '../providers/AuthProvider';

export default function Profile({ user }: { user: User }) {
  const { logout } = useAuth();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-3 items-center hover:cursor-pointer">
          <Image
            alt="name"
            src={user.imageURL}
            width={40}
            height={40}
            className="rounded-full"
          />
          <ChevronDown className="w-5 h-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex flex-col gap-3 items-center pt-5">
          <Image
            alt="name"
            src={user.imageURL}
            width={80}
            height={80}
            className="rounded-full"
          />
          <span className="text-lg font-medium text-center">
            {user.username}
          </span>
          <div className="w-full flex flex-col gap-2">
            <div className="border-t border-muted-foreground" />
            <Button variant="ghost" className="w-full">
              <span className="w-36 flex gap-2">
                <SunMoon className="w-5 h-5" />
                <span className="w-full text-start">
                  Dark Theme
                </span>
              </span>
            </Button>
            <div className="border-t border-muted-foreground" />
            <Button variant="ghost" className="w-full" onClick={() => logout()}>
              <span className="w-36 flex gap-2">
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="w-full text-red-500 text-start">
                  Logout
                </span>
              </span>
            </Button>
          </div>
        </div>

      </PopoverContent>
    </Popover>
  );
}
