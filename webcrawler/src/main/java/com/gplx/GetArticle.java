/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gplx;

import com.gplx.entity.Link;
import com.gplx.utils.DBUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Nguyen Viet Chung
 */
public class GetArticle {

//    private HashSet<String> links;
    public static void main(String[] args) {
        GetArticle getArticle = new GetArticle();
        List<Link> links = DBUtils.getAllLinks();
        for (Link link : links) {
            try {
                getArticle.getPageContent(link);
            } catch (Exception e) {
                e.printStackTrace();

            }

        }
        System.out.println("Done");

    }

    public GetArticle() {
//        links = new HashSet<>();
    }

    public void getPageContent(Link link) throws Exception {
        //4. Check if you have already crawled the URLs
        //(we are intentionally not checking for duplicate content in this example)

        //4. (i) If not add it to the index
        Document document = Jsoup.connect(link.getUrl()).ignoreHttpErrors(true).userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36").get();
//        if (document.toString().contains("Không có bài viết thuộc danh mục này!")) {
//            throw new Exception();
//        }
        Elements videos = document.select("video > source ");
        if (!videos.isEmpty()) {
            String video = videos.get(0).attr("src");
            link.setVideo(video);
        }
        Elements starts = document.select("strong.start ");
        if (!starts.isEmpty()) {
            String start = starts.get(0).text().replace("s","");
            link.setStartTime(Double.parseDouble(start));
        }

        Elements ends = document.select("strong.end ");
        if (!ends.isEmpty()) {
            String end = ends.get(0).text().replace("s","");
            link.setEndTime(Double.parseDouble(end));
        }
        System.out.println();
        DBUtils.saveEntity(link);
    }

}
