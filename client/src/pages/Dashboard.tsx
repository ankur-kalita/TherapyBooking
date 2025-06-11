import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Theray Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={user.role === 'therapist' ? 'default' : 'secondary'}>
                {user.role}
              </Badge>
              <span className="text-gray-700">Welcome, {user.name}</span>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.name}</div>
                <p className="text-xs text-muted-foreground">
                  {user.email}
                </p>
                {user.phone && (
                  <p className="text-xs text-muted-foreground">
                    {user.phone}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {user.role === 'client' ? 'Upcoming Sessions' : 'Today\'s Sessions'}
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  No sessions scheduled
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {user.role === 'client' ? 'Total Sessions' : 'Total Clients'}
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Getting started
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {user.role === 'client' ? (
                    <>
                      <Button className="w-full">
                        Find Therapists
                      </Button>
                      <Button variant="outline" className="w-full">
                        Book Session
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Sessions
                      </Button>
                      <Button variant="outline" className="w-full">
                        Update Profile
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full">
                        Complete Profile
                      </Button>
                      <Button variant="outline" className="w-full">
                        Manage Schedule
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Sessions
                      </Button>
                      <Button variant="outline" className="w-full">
                        Client Messages
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
