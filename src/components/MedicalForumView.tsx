import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle, 
  Plus, 
  Send, 
  UserCheck, 
  Filter, 
  Search, 
  Sparkles,
  X
} from 'lucide-react';
import { ForumPost, MedicalSubject } from '../types';

interface MedicalForumViewProps {
  posts: ForumPost[];
  onAddPost: (post: ForumPost) => void;
  onAddAnswer: (postId: string, answerText: string) => void;
  onToggleUpvote: (postId: string) => void;
}

export const MedicalForumView: React.FC<MedicalForumViewProps> = ({
  posts,
  onAddPost,
  onAddAnswer,
  onToggleUpvote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | MedicalSubject>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);

  // New post form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MedicalSubject>('Anatomia');
  const [newContent, setNewContent] = useState('');

  // Reply state per post
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);

  const filteredPosts = posts.filter(p => {
    const matchCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchSearch = searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newP: ForumPost = {
      id: `post-${Date.now()}`,
      title: newTitle.trim(),
      author: 'Estudante de Medicina',
      authorRole: 'Estudante',
      date: 'Agora mesmo',
      category: newCategory,
      content: newContent.trim(),
      upvotes: 1,
      userHasUpvoted: true,
      answers: []
    };

    onAddPost(newP);
    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleSendReply = (postId: string) => {
    const text = replyTextMap[postId];
    if (!text || !text.trim()) return;

    onAddAnswer(postId, text.trim());
    setReplyTextMap(prev => ({ ...prev, [postId]: '' }));
    setActiveReplyPostId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Fórum Exclusivo de Discussão com Especialistas
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Espaço de alto nível técnico para debate de casos clínicos reais, condutas controversas e correlações anatômicas com médicos preceptores.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Abrir Discussão de Caso</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl bg-slate-200/70 p-1">
          {(['Todos', 'Anatomia', 'Farmacologia'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar caso ou especialista..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4"
          >
            {/* Post Author Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                  {post.author[0]}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900">{post.author}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {post.authorRole}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{post.date}</span>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                {post.category}
              </span>
            </div>

            {/* Post Title & Content */}
            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Upvote & Reply counts */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => onToggleUpvote(post.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  post.userHasUpvoted
                    ? 'bg-teal-50 text-teal-700 border border-teal-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${post.userHasUpvoted ? 'fill-teal-600 text-teal-600' : ''}`} />
                <span>{post.upvotes} Relevante</span>
              </button>

              <button
                onClick={() => setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Responder ({post.answers.length})
              </button>
            </div>

            {/* Answers section */}
            {post.answers.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                {post.answers.map((ans) => (
                  <div
                    key={ans.id}
                    className={`p-4 rounded-2xl text-xs space-y-2 ${
                      ans.isVerifiedExpert
                        ? 'bg-teal-50/70 border border-teal-200/80 text-teal-950'
                        : 'bg-slate-50 border border-slate-200/60 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{ans.author}</span>
                        {ans.isVerifiedExpert && (
                          <span className="flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-600 text-white">
                            <CheckCircle className="w-3 h-3" />
                            <span>Especialista Verificado</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{ans.date}</span>
                    </div>

                    <p className="leading-relaxed whitespace-pre-line text-xs">
                      {ans.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Inline reply input */}
            {activeReplyPostId === post.id && (
              <div className="pt-2 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Contribua com seu raciocínio clínico ou conduta..."
                  value={replyTextMap[post.id] || ''}
                  onChange={(e) => setReplyTextMap(prev => ({ ...prev, [post.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply(post.id)}
                  className="flex-1 text-xs border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
                <button
                  onClick={() => handleSendReply(post.id)}
                  className="p-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal: New Discussion */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Abrir Discussão de Caso Clínico</h3>
              <button onClick={() => setShowNewPostModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Área Principal</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewCategory('Anatomia')}
                    className={`p-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                      newCategory === 'Anatomia' ? 'bg-teal-50 border-teal-500 text-teal-800' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Anatomia Cirúrgica
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCategory('Farmacologia')}
                    className={`p-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                      newCategory === 'Farmacologia' ? 'bg-teal-50 border-teal-500 text-teal-800' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Farmacologia Clínica
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Título do Caso / Dúvida Clínica</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Risco de lesão do nervo frênico em punção de jugular interna"
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Descrição do Caso e Detalhes</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Descreva o quadro do paciente, achados de exame físico, drogas envolvidas e a pergunta que gostaria de debater com preceptores..."
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-800 hover:bg-teal-900 text-white shadow-xs"
                >
                  Publicar no Fórum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
