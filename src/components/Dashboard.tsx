
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, FolderOpen, Calendar } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Documents', value: '1,247', icon: FileText, color: 'bg-blue-500' },
    { title: 'Active Users', value: '89', icon: Users, color: 'bg-green-500' },
    { title: 'Categories', value: '12', icon: FolderOpen, color: 'bg-purple-500' },
    { title: 'Recent Uploads', value: '34', icon: Calendar, color: 'bg-orange-500' },
  ];

  const recentDocuments = [
    { name: 'Annual Report 2024.pdf', category: 'Finance', uploadDate: '2024-01-15', size: '2.4 MB' },
    { name: 'HR Policy Update.docx', category: 'HR', uploadDate: '2024-01-14', size: '856 KB' },
    { name: 'Project Proposal.pdf', category: 'Projects', uploadDate: '2024-01-13', size: '1.2 MB' },
    { name: 'Legal Contract.pdf', category: 'Legal', uploadDate: '2024-01-12', size: '945 KB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back, Admin
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.category} • {doc.size}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {doc.uploadDate}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { Dashboard };
