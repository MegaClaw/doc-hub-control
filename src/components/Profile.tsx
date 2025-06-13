
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Shield, Calendar, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@company.com'
  });

  const userInfo = {
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@company.com',
    role: user?.role || 'Administrator',
    joinDate: 'January 15, 2023',
    lastLogin: 'January 15, 2024 at 2:30 PM',
    documentsUploaded: 127,
    storageUsed: '2.4 GB',
    storageLimit: '10 GB'
  };

  const handleSaveProfile = () => {
    // In a real app, you would make an API call here
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: userInfo.name,
      email: userInfo.email
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    toast({
      title: "Change Password",
      description: "Password change functionality would be implemented here",
    });
  };

  const handleEnableTwoFactor = () => {
    toast({
      title: "Two-Factor Authentication",
      description: "2FA setup would be implemented here",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  {isEditing ? (
                    <Input 
                      id="fullName" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  ) : (
                    <Input id="fullName" value={userInfo.name} readOnly />
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input 
                      id="email" 
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    />
                  ) : (
                    <Input id="email" value={userInfo.email} readOnly />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={userInfo.role} readOnly />
                </div>
                <div>
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" value={userInfo.joinDate} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full" onClick={handleChangePassword}>
                Change Password
              </Button>
              <Button variant="outline" className="w-full" onClick={handleEnableTwoFactor}>
                Enable Two-Factor Authentication
              </Button>
              <div className="text-sm text-gray-600">
                <p>Last login: {userInfo.lastLogin}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Quick Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{userInfo.name}</h3>
                  <p className="text-gray-600">{userInfo.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Documents Uploaded</span>
                <span className="font-semibold">{userInfo.documentsUploaded}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Storage Used</span>
                <span className="font-semibold">{userInfo.storageUsed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '24%'}}></div>
              </div>
              <div className="text-sm text-gray-500 text-center">
                {userInfo.storageUsed} of {userInfo.storageLimit} used
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { Profile };
