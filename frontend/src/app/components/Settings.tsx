import React, { useEffect, useState } from 'react';
import { useAuth, User } from '../context/AuthContext';
import { Lock, Plus, Pencil, Power,Trash2  } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner';


const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'MANAGER':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'COMPTABLE':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function Settings() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
  nom: '',
  prenom: '',
  mail: '',
  password: '',
  role: 'MANAGER' as 'ADMIN' | 'MANAGER' | 'COMPTABLE',
  isActive: true,
});
  const [dbUsers, setDbUsers] = useState<User[]>([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const fetchUsers = async () => {
  if (!user) return;

  const token =
    localStorage.getItem("idms_token") ||
    localStorage.getItem("token");

  if (!token) return;

  const url =
    user.role === "ADMIN" || user.role === "MANAGER"
      ? "http://localhost:5000/users/getAllUsers"
      : "http://localhost:5000/users/me";

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    setDbUsers(Array.isArray(data) ? data : [data]);
  } catch (err) {
    console.error(err);
    setDbUsers([]);
  }
};

  useEffect(() => {
  fetchUsers();
}, [user]);
  

  const canManageUsers = user?.role === 'ADMIN' || user?.role === 'MANAGER';
  const isAdmin = user?.role === 'ADMIN'; 
  const isSelf = editingUser?.id === user?.id;
  const handleOpenModal = (userToEdit?: User) => {
    if (userToEdit) {
      setEditingUser(userToEdit);
      setFormData({
  nom: userToEdit.nom,
  prenom: userToEdit.prenom,
  mail: userToEdit.email,
  role: userToEdit.role,
  isActive: userToEdit.isActive,
  password: "", 
});
    } else {
      setEditingUser(null);
      setFormData({
        nom: '',
        prenom: '',
        mail: '',
        password: '',
        role: 'MANAGER',
        isActive: true,
});
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async () => {
  if (!formData.nom || !formData.prenom || !formData.mail) {
    toast.error("Veuillez remplir nom, prénom et email");
    return;
  }
  if (!editingUser && !formData.password) {
    toast.error("Mot de passe obligatoire lors de l'ajout");
    return;
  }

  const token = localStorage.getItem("idms_token") || localStorage.getItem("token");
  if (!token) {
    toast.error("Vous devez vous reconnecter");
    return;
  }

  try {
    if (editingUser) {



  // Sécurité côté frontend
  if (!isAdmin && !isSelf) {
    toast.error("Vous ne pouvez modifier que votre propre compte");
    return;
  }

  const url = isAdmin
    ? `http://localhost:5000/users/updateUserByAdmin/${editingUser.id}`
    : "http://localhost:5000/users/updateMe";

  const body = isAdmin
    ? {
        email: formData.mail,
        nom: formData.nom,
        prenom: formData.prenom,
        role: formData.role,
        isActive: formData.isActive,
        ...(formData.password ? { password: formData.password } : {}),
      }
    : {
        email: formData.mail,
        nom: formData.nom,
        prenom: formData.prenom,
        ...(formData.password ? { password: formData.password } : {}),
      };

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());

  toast.success("Utilisateur modifié avec succès");
} else {
      // ADD
      const res = await fetch("http://localhost:5000/users/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formData.mail,  
          password: formData.password,
          nom: formData.nom,
          prenom: formData.prenom,
          role: formData.role,
          isActive: formData.isActive,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      toast.success("Utilisateur ajouté");
    }

    handleCloseModal();
    await fetchUsers();
    // refresh list après save
    // (le plus simple: relancer le fetch)
    // tu peux appeler une fonction fetchUsers() si tu l’as
   // temporaire si tu veux vite
  } catch (e) {
    console.error(e);
    toast.error("Erreur lors de l'enregistrement");
  }
};

  const handleToggleStatus = async (userId: number) => {
  const token =
    localStorage.getItem("idms_token") ||
    localStorage.getItem("token");

  if (!token) {
    toast.error("Session expirée");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5000/users/toggle/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error(await res.text());

    toast.success("Statut modifié avec succès");

    // recharger la liste
    setDbUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isActive: !u.isActive } : u
      )
    );
  } catch (err) {
    console.error(err);
    toast.error("Erreur lors du changement de statut");
  }
  };
  //delete user
  const handleDeleteUser = async (userId: number) => {
  if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
    return;

  const token =
    localStorage.getItem("idms_token") ||
    localStorage.getItem("token");

  if (!token) {
    toast.error("Session expirée");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5000/users/deleteUserById/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error(await res.text());

    toast.success("Utilisateur supprimé");
    await fetchUsers();
  } catch (err) {
    console.error(err);
    toast.error("Erreur lors de la suppression");
  }
};
//FCT CHANGER MDP
const handleChangePassword = async () => {
  if (!oldPassword || !newPassword) {
    toast.error("Veuillez remplir l'ancien et le nouveau mot de passe");
    return;
  }
  if (newPassword.length < 6) {
    toast.error("Le nouveau mot de passe doit contenir au moins 6 caractères");
    return;
  }

  const token = localStorage.getItem("idms_token") || localStorage.getItem("token");
  if (!token) {
    toast.error("Session expirée, reconnectez-vous");
    return;
  }

  setPwLoading(true);
  try {
    const res = await fetch("http://localhost:5000/users/updatePassword", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      toast.error(data?.error || "Erreur lors du changement du mot de passe");
      return;
    }

    toast.success("Mot de passe modifié avec succès");
    setOldPassword("");
    setNewPassword("");
  } catch (e) {
    console.error(e);
    toast.error("Erreur réseau");
  } finally {
    setPwLoading(false);
  }
};
  return (
    <div className="p-12">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      <p className="text-gray-500 mt-2">System configuration and user preferences.</p>
      
      <div className="mt-8 space-y-6 max-w-4xl">
        {/* General Settings */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">General</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Dark Mode</span>
            <button className="w-11 h-6 bg-gray-200 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
            </button>
          </div>
        </div>
      <div className="p-6 bg-white rounded-2xl border border-gray-200">
  <h3 className="font-semibold text-gray-900 mb-4">Mon compte</h3>

  <div className="grid gap-4">
    <div className="space-y-2">
      <Label htmlFor="oldPassword">Ancien mot de passe</Label>
      <Input
        id="oldPassword"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="******"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
      <Input
        id="newPassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="******"
      />
      <p className="text-xs text-gray-500">Minimum 6 caractères.</p>
    </div>

    <div className="flex justify-end">
      <Button
        onClick={handleChangePassword}
        disabled={pwLoading}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {pwLoading ? "Modification..." : "Changer mon mot de passe"}
      </Button>
    </div>
  </div>
</div>
        {/* User Management Section */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">User Management</h3>
              <p className="text-sm text-gray-500 mt-1">Manage system users and permissions.</p>
            </div>
            {isAdmin  && (
              <Button
                onClick={() => handleOpenModal()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            )}
          </div>

          
            <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...dbUsers]
                    .sort((a, b) => {
                      // 1️⃣ Current user toujours premier
                      if (a.id === user?.id) return -1;
                      if (b.id === user?.id) return 1;

                      // 2️⃣ Ordre des rôles
                      const roleOrder: Record<string, number> = {
                        ADMIN: 1,
                        MANAGER: 2,
                        COMPTABLE: 3,
                      };
                      return roleOrder[a.role] - roleOrder[b.role];
                    })
                    .map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.nom} {u.prenom}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getRoleBadgeColor(u.role)}`}>
                          {u.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${
                            u.isActive
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {u.isActive ? "Active" : "Disabled"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isAdmin && u.id !== user?.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(u.id)}
                              className="h-8"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            </Button>
                          )}
                          {isAdmin && u.id !== user?.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleStatus(u.id)}
                              className="h-8"
                            >
                              <Power
                                className={`w-3.5 h-3.5 ${
                                  u.isActive ? 'text-red-600' : 'text-green-600'
                                }`}
                              />
                            </Button>
                            )}
                            
                            {(user?.role === 'ADMIN' || u.id === user?.id) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenModal(u)}
                              className="h-8"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          
        </div>
      </div>

      {/* User Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Dupont"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                 id="prenom"
                 value={formData.prenom}
                 onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                 placeholder="Jean"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.mail}
                onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                placeholder="john.doe@idms.com"
              />
            </div>
            {isAdmin && !isSelf && (
  <>
    {/* Mot de passe */}
    <div className="space-y-2">
      <Label htmlFor="password">Mot de passe</Label>
      <Input
        id="password"
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        placeholder="Laisser vide pour ne pas changer"
      />
    </div>

    {/* Role */}
    <div className="space-y-2">
      <Label htmlFor="role">Role</Label>
      <Select
        value={formData.role}
        onValueChange={(value: 'ADMIN' | 'MANAGER' | 'COMPTABLE') =>
          setFormData({ ...formData, role: value })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ADMIN">ADMIN</SelectItem>
          <SelectItem value="MANAGER">MANAGER</SelectItem>
          <SelectItem value="COMPTABLE">COMPTABLE</SelectItem>
        </SelectContent>
      </Select>
    </div>
        
    {/* Status */}
    <div className="space-y-2">
      <Label htmlFor="status">Status</Label>
      <Select
        value={formData.isActive ? "Active" : "Disabled"}
        onValueChange={(value) =>
          setFormData({ ...formData, isActive: value === "Active" })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Disabled">Disabled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </>
            )}
            </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveUser} className="bg-blue-600 hover:bg-blue-700">
              {editingUser ? 'Save Changes' : 'Add User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
