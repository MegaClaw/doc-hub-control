
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Upload, Search, Filter, Download, Trash2, Edit } from 'lucide-react';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    { id: 1, name: 'Annual Report 2024.pdf', category: 'Finance', uploadDate: '2024-01-15', size: '2.4 MB', status: 'Active' },
    { id: 2, name: 'HR Policy Update.docx', category: 'HR', uploadDate: '2024-01-14', size: '856 KB', status: 'Active' },
    { id: 3, name: 'Project Proposal.pdf', category: 'Projects', uploadDate: '2024-01-13', size: '1.2 MB', status: 'Active' },
    { id: 4, name: 'Legal Contract.pdf', category: 'Legal', uploadDate: '2024-01-12', size: '945 KB', status: 'Expired' },
    { id: 5, name: 'Marketing Plan.pptx', category: 'Marketing', uploadDate: '2024-01-11', size: '3.1 MB', status: 'Active' },
  ];

  const categories = ['all', 'Finance', 'HR', 'Projects', 'Legal', 'Marketing'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{doc.category}</span>
                      <span>{doc.size}</span>
                      <span>{doc.uploadDate}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        doc.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { Documents };
