
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Home } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <div className="absolute top-4 right-4 z-10">
      <Link to={isAdmin ? "/" : "/admin"}>
        <Button variant="outline" size="sm">
          {isAdmin ? (
            <>
              <Home className="w-4 h-4 mr-2" />
              Back to Learning
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 mr-2" />
              Admin Dashboard
            </>
          )}
        </Button>
      </Link>
    </div>
  );
};
