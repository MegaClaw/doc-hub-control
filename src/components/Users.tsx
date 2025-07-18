import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, UserPlus, Search, Edit, Trash2, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';

const Users = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-13' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 5, name: 'Tom Brown', email: 'tom@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-12' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [managingPermissions, setManagingPermissions] = useState(null);
  const { toast } = useToast();

  // Check if current user has admin privileges
  const isAdmin = currentUser?.role === 'Admin';
  const isCurrentUser = currentUser?.role === 'User';

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'User': return 'bg-blue-100 text-blue-800';
      case 'Viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddUser = () => {
    if (!isAdmin) {
      toast({
        title: "Access denied",
        description: "Only administrators can add users",
        variant: "destructive",
      });
      return;
    }

    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please enter name and email",
        variant: "destructive",
      });
      return;
    }

    const user = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Active',
      lastLogin: 'Never'
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'User' });
    setIsDialogOpen(false);
    
    toast({
      title: "User added",
      description: `${user.name} has been added successfully`,
    });
  };

  const handleDeleteUser = (userId) => {
    if (!isAdmin) {
      toast({
        title: "Access denied",
        description: "Only administrators can delete users",
        variant: "destructive",
      });
      return;
    }

    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "User has been removed successfully",
    });
  };

  const toggleUserStatus = (userId) => {
    if (!isAdmin) {
      toast({
        title: "Access denied",
        description: "Only administrators can change user status",
        variant: "destructive",
      });
      return;
    }

    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));
    toast({
      title: "User status updated",
      description: "User status has been changed",
    });
  };

  const handleEditUser = (user) => {
    // Users can only edit their own profile, admins can edit anyone
    if (!isAdmin && user.email !== currentUser?.email) {
      toast({
        title: "Access denied",
        description: "You can only edit your own profile",
        variant: "destructive",
      });
      return;
    }

    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleSaveEdit = () => {
    // Users can only edit their own profile
    if (!isAdmin && editingUser.email !== currentUser?.email) {
      toast({
        title: "Access denied",
        description: "You can only edit your own profile",
        variant: "destructive",
      });
      return;
    }

    setUsers(users.map(user => 
      user.id === editingUser.id 
        ? { ...user, name: editForm.name, email: editForm.email, role: isAdmin ? editForm.role : user.role }
        : user
    ));
    setEditingUser(null);
    toast({
      title: "User updated",
      description: "User has been updated successfully",
    });
  };

  const handleManagePermissions = (user) => {
    if (!isAdmin) {
      toast({
        title: "Access denied",
        description: "Only administrators can manage permissions",
        variant: "destructive",
      });
      return;
    }

    setManagingPermissions(user);
    toast({
      title: "Permission Management",
      description: `Managing permissions for ${user.name}`,
    });
  };

  const updateUserRole = (newRole) => {
    if (!isAdmin) {
      toast({
        title: "Access denied",
        description: "Only administrators can change user roles",
        variant: "destructive",
      });
      return;
    }

    setUsers(users.map(user => 
      user.id === managingPermissions.id 
        ? { ...user, role: newRole }
        : user
    ));
    setManagingPermissions(null);
    toast({
      title: "Role updated",
      description: `User role has been changed to ${newRole}`,
    });
  };

  // Show access denied message for non-admin users
  if (isCurrentUser) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        </div>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="p-8">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Limited Access</h2>
              <p className="text-gray-500 mb-4">
                As a User, you have limited access to user management. You can only edit your own profile.
              </p>
              <Button 
                onClick={() => handleEditUser(users.find(u => u.email === currentUser?.email))}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit My Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Edit User Dialog for own profile */}
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit My Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editName">Full Name</Label>
                <Input
                  id="editName"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
              <div>
                <Label>Role</Label>
                <div className="p-2 bg-gray-100 rounded text-sm text-gray-600">
                  {editForm.role} (Cannot be changed)
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Full admin interface
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <Button onClick={handleAddUser} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    } ${!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!isAdmin}
                  >
                    {user.status}
                  </button>
                  <span className="text-sm text-gray-500">
                    Last: {user.lastLogin}
                  </span>
                  <div className="flex items-center space-x-2">
                    {isAdmin && (
                      <Button variant="ghost" size="sm" onClick={() => handleManagePermissions(user)}>
                        <Shield className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditUser(user)}
                      disabled={!isAdmin && user.email !== currentUser?.email}
                      className={!isAdmin && user.email !== currentUser?.email ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {isAdmin && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">Full Name</Label>
              <Input
                id="editName"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editRole">Role</Label>
              <select
                id="editRole"
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Viewer">Viewer</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Permissions Dialog */}
      {isAdmin && (
        <Dialog open={!!managingPermissions} onOpenChange={() => setManagingPermissions(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Permissions - {managingPermissions?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Current Role: <span className="font-medium">{managingPermissions?.role}</span>
              </p>
              <div className="space-y-2">
                <Label>Change Role:</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant={managingPermissions?.role === 'Viewer' ? 'default' : 'outline'}
                    onClick={() => updateUserRole('Viewer')}
                    className="justify-start"
                  >
                    Viewer - Can only view documents
                  </Button>
                  <Button 
                    variant={managingPermissions?.role === 'User' ? 'default' : 'outline'}
                    onClick={() => updateUserRole('User')}
                    className="justify-start"
                  >
                    User - Can view and upload documents
                  </Button>
                  <Button 
                    variant={managingPermissions?.role === 'Admin' ? 'default' : 'outline'}
                    onClick={() => updateUserRole('Admin')}
                    className="justify-start"
                  >
                    Admin - Full access to all features
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export { Users };
