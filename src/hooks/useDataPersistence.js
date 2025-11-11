'use client'
import { useCallback } from 'react';

export default function useDataPersistence(setTodos) {
  // 导出：直接从localStorage读数据，确保实时（避状态延迟）
  const exportTodos = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('todos');

        if (saved) {
          const exportData = JSON.parse(saved);
          if (Array.isArray(exportData)) {
            const dataStr = JSON.stringify(exportData, null, 2);

            const dataBlob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `todos-backup-${Date.now()}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            return;
          }
        }
        // Fallback: 空数组
        console.warn('No valid data in localStorage for export.');
        const dataStr = JSON.stringify([], null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-empty-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('No todos to export. Add some tasks first!');
      } catch (error) {
        console.error('Export failed:', error);
        alert('Export failed. Please check console for details.');
      }
    }
  }, [setTodos]); // 移除todos依赖，直接读local

  // 导入：文件选择 + 解析JSON + 合并（覆盖或append）
  const importTodos = useCallback((event, merge = true) => { // merge: true=append, false=replace
    const file = event.target.files[0];
    if (!file) return;

    // 放松检查：允许.json扩展或内容解析成功
    if (!file.name.endsWith('.json')) {
      console.warn('File extension is not .json, but attempting to parse anyway.');
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // 尝试去除BOM（常见UTF-8编码问题）
        let content = e.target.result;
        if (content.charCodeAt(0) === 0xFEFF) {
          content = content.slice(1);
        }
        const imported = JSON.parse(content);
        if (Array.isArray(imported)) {
          if (imported.length === 0) {
            console.warn('Imported empty todos array - no changes applied.');
            alert('Imported empty file - no todos added.');
            return;
          }
          // 验证结构
          if (imported.every(item => item && typeof item.title === 'string')) {
            setTodos((prev) => merge ? [...imported, ...prev] : imported);
            console.log(`Imported ${imported.length} todos successfully!`);
            alert(`Imported ${imported.length} todos successfully!`);
            return;
          } else {
            throw new Error('Invalid todo structure: Missing title or invalid items.');
          }
        } else {
          throw new Error('Invalid format: Expected an array of todos.');
        }
      } catch (error) {
        console.error('Import failed:', error);
        alert(`Import failed: ${error.message}. Please check the file format.`);
      }
    };
    reader.onerror = (e) => {
      alert('Failed to read file. Please try again.');
    };
    reader.readAsText(file, 'UTF-8'); // 指定编码
    // 清空input
    event.target.value = '';
  }, [setTodos]);

  return { exportTodos, importTodos };
}