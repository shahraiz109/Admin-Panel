"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(true);
  const { toast } = useToast();

    const router = useRouter()

  const handleLogout = () => {
    // Add your logout logic here
    setShowLogoutDialog(false);
    toast({
      title: "Logged out",
      description: "You have successfully logged out.",
    });
   router.push("/dashboard")
  };

  return (
    <div>
      {/* <Button variant="secondary" className="flex h-screen items-center justify-center text-center" onClick={() => setShowLogoutDialog(true)}>
        Logout
      </Button> */}

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account and redirected to the home
              page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <Button variant="destructive" onClick={handleLogout}>
              Log out
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LogoutPage;
