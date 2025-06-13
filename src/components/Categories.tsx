
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FolderOpen, Plus, Edit, Trash2, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Finance', description: 'Financial documents and reports', documentCount: 45, color: 'bg-green-500' },
    { id: 2, name: 'HR', description: 'Human resources policies and procedures', documentCount: 23, color: 'bg-blue-500' },
    { id: 3, name: 'Legal', description: 'Legal contracts and agreements', documentCount: 18, color: 'bg-purple-500' },
    { id: 4, name: 'Projects', description: 'Project documentation and proposals', documentCount: 34, color: 'bg-orange-500' },
    { id: 5, name: 'Marketing', description: 'Marketing materials and campaigns', documentCount: 29, color: 'bg-pink-500' },
    { id: 6, name: 'Operations', description: 'Operational procedures and manuals', documentCount: 12, color: 'bg-indigo-500' },
  ]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const { toast } = useToast();

  const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-yellow-500'];

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a category name",
        variant: "destructive",
      });
      return;
    }

    const category = {
      id: Date.now(),
      name: newCategory.name,
      description: newCategory.description,
      documentCount: 0,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Category added",
      description: `${category.name} has been created successfully`,
    });
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast({
      title: "Category deleted",
      description: "Category has been removed successfully",
    });
  };

  const handleViewAll = (category) => {
    setSelectedCategory(category);
    setShowCategoryDetails(true);
    toast({
      title: "Category Details",
      description: `Viewing all documents in ${category.name}`,
    });
  };

  if (showCategoryDetails && selectedCategory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setShowCategoryDetails(false)}>
              ← Back to Categories
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">{selectedCategory.name} Documents</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Documents in {selectedCategory.name} ({selectedCategory.documentCount})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">This category contains {selectedCategory.documentCount} documents</p>
              <p className="text-sm text-gray-500 mt-2">{selectedCategory.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                />
              </div>
              <Button onClick={handleAddCategory} className="w-full bg-blue-600 hover:bg-blue-700">
                Add Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewAll(category)}
                >
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
