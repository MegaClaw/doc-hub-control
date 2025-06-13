
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, UserPlus, Search, Edit, Trash2, Shield } from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-13' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 5, name: 'Tom Brown', email: 'tom@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-12' },
  ];

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
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
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Last: {user.lastLogin}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Shield className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { Users };
