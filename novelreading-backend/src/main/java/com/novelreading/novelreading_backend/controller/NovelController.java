package com.novelreading.novelreading_backend.controller;

import com.novelreading.novelreading_backend.dto.NovelDTO;
import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.service.NovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController   //nhan phan hoi va dieu khien cung 1 thoi diem
@RequestMapping()   //anh xa
public class NovelController {
    @Autowired
    private NovelService novelService;

    @PostMapping("/admin/novel/add")
    public NovelDTO add(@RequestBody NovelDTO novelDTO){
        return novelService.saveNovel(novelDTO);
    }

    @GetMapping("/admin/novel/find/{id}")
    public ResponseEntity<NovelDTO> getById(@PathVariable("id") Long id){
        NovelDTO novelDTO = novelService.getNovelByID(id);
        return ResponseEntity.ok(novelDTO);
    }

    @DeleteMapping("/admin/novel/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id){
        novelService.deleteNovel(id);
        return ResponseEntity.ok("Xóa thành công");
    }

    @PutMapping("/admin/novel/update/{id}")
    public NovelDTO update(@PathVariable("id") Long id,@RequestBody NovelDTO novelDTO){
        return novelService.updateNovel(id,novelDTO);
    }

    @GetMapping("/novel/get/{route}")
    public NovelDTO getByRoute(@PathVariable("route")String route){
        return novelService.getNovelByRoute(route);
    }

    @GetMapping("/novel/getAll")
    public Page<NovelDTO> getAllNovel(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "12") int size){
        Pageable pageable = PageRequest.of(page,size);
        return novelService.getAllNovel(pageable);
    }

    @GetMapping("/novel/updated-novel")
    public Page<NovelDTO> getNewUpdatedNovels(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ){
        Pageable pageable = PageRequest.of(page,size);
        return novelService.getAllByOrderByDateDesc(pageable);
    }

    @GetMapping("/novel/rating-novel")
    public Page<NovelDTO> getHighRatingNovels(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "12") int size){
        Pageable pageable = PageRequest.of(page,size);
        return novelService.getAllByOrderByAvgRatingDesc(pageable);
    }

    @GetMapping("/novel/high-view-novel")
    public Page<NovelDTO> getHighViewNovels(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "12") int size){
        Pageable pageable = PageRequest.of(page,size);
        return novelService.getAllByOrderByViewDesc(pageable);
    }

    @GetMapping("/novel/filter")
    public Page<NovelDTO> filterNovel(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "12") int size,
                                      @RequestParam(required = false) String genre,
                                      @RequestParam(required = false) String country,
                                      @RequestParam(required = false) String status){
        Pageable pageable= PageRequest.of(page,size);
        return novelService.filerNovel(genre,country,status,pageable);
    }


    @GetMapping("/novel/search")
    public List<NovelDTO> searchNovel(@RequestParam String search){
        List<NovelDTO> novels = novelService.searchNovel(search);
        return novels;
    }

    @PostMapping("/novel/inc-view/{id}")
    public ResponseEntity<String> incView(@PathVariable("id")Long id){
        return novelService.incView(id);
    }
}
