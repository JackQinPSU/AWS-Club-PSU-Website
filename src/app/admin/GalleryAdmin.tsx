import { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Trash2, ArrowLeft, Upload, Pencil, Camera } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { GalleryAlbum, GalleryPhoto } from '../../lib/types';

type View = 'albums' | 'photos' | 'album-form';

type AlbumDraft = Omit<GalleryAlbum, 'id'>;

const BLANK_ALBUM: AlbumDraft = { label: '', date: '', cover_image_url: null, sort_order: 0 };

const inputCls =
  'w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#555] placeholder:text-[#3a3a3a]';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-[#666] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function GalleryAdmin() {
  const [view, setView] = useState<View>('albums');
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [albumForm, setAlbumForm] = useState<AlbumDraft>(BLANK_ALBUM);

  const coverFileRef = useRef<HTMLInputElement>(null);
  const photosFileRef = useRef<HTMLInputElement>(null);

  const loadAlbums = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('gallery_albums')
      .select('*')
      .order('sort_order')
      .order('created_at', { ascending: false });
    setAlbums(data ?? []);
    setLoading(false);
  }, []);

  const loadPhotos = useCallback(async (albumId: string) => {
    const { data } = await supabase
      .from('gallery_photos')
      .select('*')
      .eq('album_id', albumId)
      .order('sort_order')
      .order('created_at');
    setPhotos(data ?? []);
  }, []);

  useEffect(() => { loadAlbums(); }, [loadAlbums]);

  const openAlbum = (album: GalleryAlbum) => {
    setSelectedAlbum(album);
    loadPhotos(album.id);
    setView('photos');
  };

  const openAlbumForm = (album?: GalleryAlbum) => {
    setEditingAlbum(album ?? null);
    setAlbumForm(album ?? BLANK_ALBUM);
    setView('album-form');
  };

  const saveAlbum = async () => {
    setSaving(true);
    if (editingAlbum) {
      await supabase.from('gallery_albums').update(albumForm).eq('id', editingAlbum.id);
      setSaving(false);
      setView('albums');
      loadAlbums();
    } else {
      const { data } = await supabase.from('gallery_albums').insert(albumForm).select().single();
      setSaving(false);
      loadAlbums();
      if (data) {
        setSelectedAlbum(data);
        setPhotos([]);
        setView('photos');
      }
    }
  };

  const deleteAlbum = async (album: GalleryAlbum) => {
    if (!confirm(`Delete album "${album.label}" and all its photos?`)) return;
    await supabase.from('gallery_albums').delete().eq('id', album.id);
    loadAlbums();
  };

  const uploadCover = async (file: File) => {
    setUploading(true);
    const path = `covers/${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('gallery').upload(path, file);
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(path);
      setAlbumForm(prev => ({ ...prev, cover_image_url: publicUrl }));
    }
    setUploading(false);
  };

  const uploadPhotos = async (files: FileList) => {
    if (!selectedAlbum) return;
    setUploading(true);
    setUploadError('');
    const isFirstUpload = photos.length === 0;
    let anyError = '';

    await Promise.all(Array.from(files).map(async (file, i) => {
      const path = `albums/${selectedAlbum.id}/${Date.now()}-${i}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage.from('gallery').upload(path, file);
      if (error) {
        anyError = error.message;
      } else {
        const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(path);
        await supabase.from('gallery_photos').insert({
          album_id: selectedAlbum.id,
          image_url: publicUrl,
          caption: '',
          sort_order: 0,
        });
        if (isFirstUpload && i === 0 && !selectedAlbum.cover_image_url) {
          await supabase.from('gallery_albums').update({ cover_image_url: publicUrl }).eq('id', selectedAlbum.id);
        }
      }
    }));

    if (anyError) setUploadError(`Upload failed: ${anyError}`);
    setUploading(false);
    loadPhotos(selectedAlbum.id);
    loadAlbums();
  };

  const deletePhoto = async (photo: GalleryPhoto) => {
    if (!confirm('Delete this photo?')) return;
    const path = photo.image_url.split('/object/public/gallery/').pop();
    if (path) await supabase.storage.from('gallery').remove([decodeURIComponent(path)]);
    await supabase.from('gallery_photos').delete().eq('id', photo.id);
    if (selectedAlbum) loadPhotos(selectedAlbum.id);
  };

  const setCover = async (photo: GalleryPhoto) => {
    if (!selectedAlbum) return;
    await supabase.from('gallery_albums').update({ cover_image_url: photo.image_url }).eq('id', selectedAlbum.id);
    loadAlbums();
  };

  // ── Album form ──────────────────────────────────────────
  if (view === 'album-form') {
    return (
      <div className="p-8 max-w-xl">
        <button
          onClick={() => setView('albums')}
          className="flex items-center gap-1.5 text-sm text-[#666] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-base font-semibold text-white mb-6">
          {editingAlbum ? 'Edit Album' : 'New Album'}
        </h2>
        <div className="space-y-4">
          <Field label="Album name">
            <input
              className={inputCls}
              value={albumForm.label}
              onChange={e => setAlbumForm(p => ({ ...p, label: e.target.value }))}
              placeholder="Serverless Workshop"
            />
          </Field>
          <Field label="Date">
            <input
              className={inputCls}
              value={albumForm.date}
              onChange={e => setAlbumForm(p => ({ ...p, date: e.target.value }))}
              placeholder="Feb 2026"
            />
          </Field>
          <Field label="Cover photo">
            {albumForm.cover_image_url && (
              <img src={albumForm.cover_image_url} className="w-full h-36 object-cover rounded mb-2 border border-[#2a2a2a]" />
            )}
            <input ref={coverFileRef} type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadCover(f); }} />
            <button
              type="button"
              onClick={() => coverFileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-3 py-2 border border-[#2a2a2a] text-[#888] text-sm rounded hover:border-[#444] hover:text-white disabled:opacity-50 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading ? 'Uploading…' : albumForm.cover_image_url ? 'Replace cover' : 'Upload cover'}
            </button>
          </Field>
          <Field label="Sort order (lower = first)">
            <input
              className={inputCls}
              type="number"
              value={albumForm.sort_order}
              onChange={e => setAlbumForm(p => ({ ...p, sort_order: Number(e.target.value) }))}
            />
          </Field>
        </div>
        <div className="mt-8 flex gap-3">
          <button
            onClick={saveAlbum}
            disabled={saving || !albumForm.label}
            className="px-5 py-2 bg-[#FF9900] text-black font-bold text-sm rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={() => setView('albums')}
            className="px-5 py-2 border border-[#2a2a2a] text-[#888] text-sm rounded hover:border-[#444] hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ── Photos view ─────────────────────────────────────────
  if (view === 'photos' && selectedAlbum) {
    return (
      <div className="p-8">
        <button
          onClick={() => { setView('albums'); setSelectedAlbum(null); setPhotos([]); }}
          className="flex items-center gap-1.5 text-sm text-[#666] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All albums
        </button>
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-white">{selectedAlbum.label}</h1>
            <p className="text-xs text-[#555] mt-1">{photos.length} photos · {selectedAlbum.date}</p>
          </div>
          <div>
            <input
              ref={photosFileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => { if (e.target.files?.length) uploadPhotos(e.target.files); }}
            />
            <button
              onClick={() => photosFileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF9900] text-black font-bold text-sm rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading ? 'Uploading…' : 'Upload photos'}
            </button>
          </div>
        </div>

        {uploadError && (
          <p className="text-red-400 text-sm mb-4">{uploadError}</p>
        )}

        {photos.length === 0 ? (
          <div className="border border-dashed border-[#2a2a2a] rounded-lg p-16 flex flex-col items-center gap-3 text-center">
            <Camera className="w-8 h-8 text-[#333]" />
            <p className="text-[#555] text-sm">No photos yet. Click Upload to add some.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map(photo => (
              <div key={photo.id} className="relative group aspect-square overflow-hidden rounded border border-[#1e1e1e]">
                <img src={photo.image_url} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCover(photo)}
                    title="Set as album cover"
                    className="p-1.5 bg-[#FF9900] rounded text-black hover:opacity-90 transition-opacity"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deletePhoto(photo)}
                    title="Delete photo"
                    className="p-1.5 bg-red-500 rounded text-white hover:opacity-90 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Albums list ─────────────────────────────────────────
  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">Gallery</h1>
          <p className="text-xs text-[#555] mt-1">{albums.length} albums</p>
        </div>
        <button
          onClick={() => openAlbumForm()}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF9900] text-black font-bold text-sm rounded hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" /> New Album
        </button>
      </div>

      {loading ? (
        <p className="text-[#444] text-sm">Loading…</p>
      ) : albums.length === 0 ? (
        <p className="text-[#444] text-sm">No albums yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map(album => (
            <div key={album.id} className="border border-[#1e1e1e] rounded overflow-hidden group">
              <button
                onClick={() => openAlbum(album)}
                className="w-full aspect-video bg-[#111] overflow-hidden block"
              >
                {album.cover_image_url ? (
                  <img src={album.cover_image_url} alt={album.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-[#333]" />
                  </div>
                )}
              </button>
              <div className="p-3 border-t border-[#1a1a1a] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">{album.label}</p>
                    <p className="text-xs text-[#555] mt-0.5">{album.date}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => openAlbumForm(album)}
                      className="p-1.5 text-[#444] hover:text-white transition-colors rounded hover:bg-[#1a1a1a]"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => deleteAlbum(album)}
                      className="p-1.5 text-[#444] hover:text-red-400 transition-colors rounded hover:bg-[#1a1a1a]"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => openAlbum(album)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 border border-[#2a2a2a] text-[#777] text-xs rounded hover:border-[#FF9900] hover:text-[#FF9900] transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  Add / view photos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
