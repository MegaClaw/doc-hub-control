
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FolderOpen, Plus, Edit, Trash2, FileText } from 'lucide-react';

const Categories = () => {
  const [newCategory, setNewCategory] = useState('');

  const categories = [
    { id: 1, name: 'Finance', description: 'Financial documents and reports', documentCount: 45, color: 'bg-green-500' },
    { id: 2, name: 'HR', description: 'Human resources policies and procedures', documentCount: 23, color: 'bg-blue-500' },
    { id: 3, name: 'Legal', description: 'Legal contracts and agreements', documentCount: 18, color: 'bg-purple-500' },
    { id: 4, name: 'Projects', description: 'Project documentation and proposals', documentCount: 34, color: 'bg-orange-500' },
    { id: 5, name: 'Marketing', description: 'Marketing materials and campaigns', documentCount: 29, color: 'bg-pink-500' },
    { id: 6, name: 'Operations', description: 'Operational procedures and manuals', documentCount: 12, color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
      </div>

      {/* Add New Category */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Category name..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FileText className="w-4 h-4" />
                  <span>{category.documentCount} documents</span>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { Categories };
