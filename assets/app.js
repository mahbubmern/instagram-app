const form_data = document.getElementById("form_data");
const edit_form_data = document.getElementById("edit_form_data");
const all_post = document.querySelector(".all_post");
const edit = document.querySelector(".edit_form_data");
const post_delete = document.querySelector(".post_delete");

const dataShow = () => {
  const data = getData("InsPost");

  let list = "";

  if (!data || data.length == 0) {
    list = `<div class="no"> <p class="text-center">No Post Found</p></div>`;
  } else {
    data.map((item, index) => {
      let agoTime = timeAgo(item.timeStamps);
      list += `<div class="post-body my-3">
        <div class="post">
            <div class="post_creator_details">
                <img style="width: 40px; height:40px; border-radius:50%; object-fit:cover" src="${item.image}" alt="">
                <span style="padding-left: 10px">${item.name}</span>
            </div>
            <div class="dot">
                <div class="dropdown">
                    <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown">
                        <i class="fas fa-ellipsis-h"></i>
                    </a>
                  
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><a class="dropdown-item post_edit" data-bs-toggle="modal" post_index=${index}  href="#edit_post">Edit</a></li>
                      <li><a class="dropdown-item post-delete" data-bs-toggle="modal" post_index=${index}  href="#delete_post">Delete</a></li>                                      
                    </ul>
                </div>	
            </div>
        </div>
        <div class="post-content">
        <div class="content">
           <p>${item.post}</p>
             </div>
            <div class="post_image">
                <img class="w-100" src="${item.photo}" alt="">
            </div>
            
            <div class="post-icon">
                <div class="icon-left">
                    <a href="#"><svg aria-label="Activity Feed" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg></a>
                    <a href="#"><i class="bi bi-chat-dots"></i></a>
                    <a href="#"><svg aria-label="Direct" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg></a>
                </div>
                <div class="icon-middle">
                    <div class="div1"></div>
                    <div class="div1"></div>
                    <div class="div1"></div>
                    <div class="div1"></div>
                </div>
                <div class="icon-right">
                    <a href="#"><svg aria-label="Save" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg></a>
                </div>
            </div>
            <div class="writting">
                <p>62,323 likes</p>
                <p> <strong>mahbub</strong> </p>
                <p>View all 537 comments</p>
                <p style="color:red">${agoTime}</p>
            </div>
        </div>

        <div class="comment">
            <input type="text" placeholder="Add a Comment">
        <svg aria-label="Emoji" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
        <a href="#">Post</a>
    </div>

    </div>`;
    });
  }

  all_post.innerHTML = list;
};

dataShow();

form_data.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData.entries());

  const { image, name, photo, post } = data;

  sendData("InsPost", {
    image,
    name,
    photo,
    post,
    timeStamps: time(),
  });
  dataShow();
  e.target.reset();
};

all_post.onclick = (e) => {
  if (e.target.classList.contains("post_edit")) {
    let index = e.target.getAttribute("post_index");
    const data = getData("InsPost");
    const { image, name, photo, post } = data[index];

    edit_form_data.innerHTML = `
    <div class="my-3">
        <label for="">Name</label>
        <input type="text" class="form-control" name="name" value="${name}">
    </div>
    <div class="my-3">
        <label for="">Photo</label>
        <input type="text" class="form-control" name="photo"value="${image}">
    </div>
    <div class="my-3">
        <label for="">Content Photo</label>
        <input type="text" class="form-control" name="image" value="${photo}">
    </div>

    <div class="my-3">
        
        <input type="text" class="form-control" value="${index}" name="index">
    </div>

    <div class="my-3">
        <label for="">Post</label>
        <textarea class="form-control" name="post" id="" cols="30" rows="5">${post}</textarea>
    </div>
    <div class="my-3">
        
        <input type="submit" class="btn btn-info w-100" value="Update">
    </div>
    
`;
  }

  if (e.target.classList.contains("post-delete")) {
    let index = e.target.getAttribute("post_index");
    const data = getData("InsPost");

    post_delete.onclick = (e) => {
      data.splice(index, 1);
      update("InsPost", data);
      dataShow();
    };
  }
};

edit_form_data.onsubmit = (e) => {
  e.preventDefault();

  const data = getData("InsPost");

  const formData = new FormData(e.target);

  const edata = Object.fromEntries(formData.entries());

  const { image, name, photo, post, index } = edata;

  data[index] = { image, name, photo, post };

  let newTime = data[index].timeStamps;

  data[index] = {
    image,
    name,
    photo,
    post,
    timeStamps: newTime,
  };

  update("InsPost", data);
  dataShow();
};
