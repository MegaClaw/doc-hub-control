
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Upload, Search, Download, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Annual Report 2024.pdf', category: 'Finance', uploadDate: '2024-01-15', size: '2.4 MB', uploader: 'John Doe' },
    { id: 2, name: 'HR Policy Update.docx', category: 'HR', uploadDate: '2024-01-14', size: '856 KB', uploader: 'Jane Smith' },
    { id: 3, name: 'Project Proposal.pdf', category: 'Projects', uploadDate: '2024-01-13', size: '1.2 MB', uploader: 'Mike Johnson' },
    { id: 4, name: 'Legal Contract.pdf', category: 'Legal', uploadDate: '2024-01-12', size: '945 KB', uploader: 'Sarah Wilson' },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newDocument = {
        id: Date.now(),
        name: file.name,
        category: 'General',
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploader: 'Current User'
      };
      
      setDocuments([newDocument, ...documents]);
      setIsUploading(false);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded`,
      });
    }, 2000);
  };

  const handleDownload = (doc) => {
    toast({
      title: "Download started",
      description: `Downloading ${doc.name}`,
    });
  };

  const handleDelete = (docId) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast({
      title: "Document deleted",
      description: "Document has been removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file">Select File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                  disabled={isUploading}
                />
              </div>
              {isUploading && (
                <div className="text-center">
                  <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
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
                    <p className="text-sm text-gray-500">{doc.category} • {doc.size} • Uploaded by {doc.uploader}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{doc.uploadDate}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(doc.id)}>
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
